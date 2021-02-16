const { rejects, deepEqual } = require('assert');

const mod = require('./main.js');

const RemoteStorage = require('remotestoragejs');

describe('_ZDRModelSyncCallbackSignature', function test__ZDRModelSyncCallbackSignature() {

	it('returns undefined', function() {
		deepEqual(mod._ZDRModelSyncCallbackSignature(), undefined);
	});

	it('returns undefined if window', function() {
		deepEqual(mod._ZDRModelSyncCallbackSignature({
			origin: 'window',
		}), undefined);
	});

	it('returns undefined if local init', function() {
		deepEqual(mod._ZDRModelSyncCallbackSignature({
			origin: 'local',
		}), undefined);
	});

	it('returns string if remote create', function() {
		deepEqual(mod._ZDRModelSyncCallbackSignature({
			origin: 'remote',
			oldValue: undefined,
			newValue: Math.random().toString(),
		}), 'ZDRSchemaSyncCallbackCreate');
	});

	it('returns string if remote update', function() {
		deepEqual(mod._ZDRModelSyncCallbackSignature({
			origin: 'remote',
			oldValue: Math.random().toString(),
			newValue: Math.random().toString(),
		}), 'ZDRSchemaSyncCallbackUpdate');
	});

	it('returns string if remote delete', function() {
		deepEqual(mod._ZDRModelSyncCallbackSignature({
			origin: 'remote',
			oldValue: Math.random().toString(),
			newValue: undefined,
		}), 'ZDRSchemaSyncCallbackDelete');
	});

	it('returns string if conflict', function() {
		deepEqual(mod._ZDRModelSyncCallbackSignature({
			origin: 'conflict',
		}), 'ZDRSchemaSyncCallbackConflict');
	});

});

describe('ZDRStorage_RemoteStorage', function test_ZDRStorage_RemoteStorage () {

	const _ZDRStorageRemoteStorage = function (inputData = {}) {
		const ZDRScopeKey = inputData.ZDRScopeKey || Math.random().toString();

		return mod.ZDRStorage(Object.assign({
			ZDRParamScopes: [uStubScope(Object.assign({
				ZDRScopeKey,
			}, inputData))],
		}, inputData))[ZDRScopeKey];
	};

	context('ZDRStorageWriteObject', function test_ZDRStorageWriteObject () {

		it('calls client.access.claim', function () {
			const ZDRScopeKey = Math.random().toString();

			deepEqual(uCapture(function (outputData) {
				_ZDRStorageRemoteStorage({
					ZDRScopeKey,
					ZDRParamLibrary: uStubRemoteStorage({
						claim: (function () {
							outputData.push(...arguments);
						}),
					}),
				})
			}), [ZDRScopeKey, 'rw']);
		});
	
	});

	context('ZDRStorageWriteObject', function test_ZDRStorageWriteObject () {

		it('calls scope.storeFile', async function () {
			const param1 = Math.random().toString();
			const param2 = {
				[Math.random().toString()]: Math.random().toString(),
			};

			await rejects(_ZDRStorageRemoteStorage({
				ZDRParamLibrary: uStubRemoteStorage({
					storeFile: (function () {
						return Promise.reject([...arguments]);
					}),
				}),
			}).ZDRStorageWriteObject(param1, param2), ['application/json', param1, JSON.stringify(param2)]);
		});
	
	});

	context('ZDRStorageWriteFile', function test_ZDRStorageWriteFile () {

		it('calls scope.storeFile', async function () {
			const param1 = Math.random().toString();
			const param2 = Math.random().toString();
			const param3 = Date.now().toString() + '/' + Date.now().toString();

			await rejects(_ZDRStorageRemoteStorage({
				ZDRParamLibrary: uStubRemoteStorage({
					storeFile: (function () {
						return Promise.reject([...arguments]);
					}),
				}),
			}).ZDRStorageWriteFile(param1, param2, param3), [param3, param1, param2]);
		});
	
	});

	context('ZDRStorageReadObject', function test_ZDRStorageReadObject () {

		it('calls scope.getObject', async function () {
			const item = Math.random().toString();
			
			await rejects(_ZDRStorageRemoteStorage({
				ZDRParamLibrary: uStubRemoteStorage({
					getObject: (function () {
						return Promise.reject([...arguments]);
					}),
				}),
			}).ZDRStorageReadObject(item), [item, false]);
		});
	
	});

	context('ZDRStorageReadFile', function test_ZDRStorageReadFile () {

		it('calls scope.getFile', async function () {
			const item = Math.random().toString();
			
			await rejects(_ZDRStorageRemoteStorage({
				ZDRParamLibrary: uStubRemoteStorage({
					getFile: (function () {
						return Promise.reject([...arguments]);
					}),
				}),
			}).ZDRStorageReadFile(item), [item, false]);
		});
	
	});

	context('ZDRStorageListObjects', function test_ZDRStorageListObjects () {

		const ZDRScopeKey = Date.now().toString();

		it('calls scope.getAll', async function () {
			const item = Math.random().toString();
			
			await rejects(_ZDRStorageRemoteStorage({
				ZDRParamLibrary: uStubRemoteStorage({
					getAll: (function () {
						return Promise.reject([...arguments]);
					}),
				}),
			}).ZDRStorageListObjects(item), [item, false]);
		});

		it('excludes folder', async function () {
			const item = ZDRScopeKey + '/';

			const client = _ZDRStorageRemoteStorage({
				ZDRScopeKey,
				ZDRParamLibrary: RemoteStorage,
			});

			await client.ZDRStorageWriteObject(item + Math.random().toString() + '/' + Math.random().toString(), {
				[Math.random().toString()]: Math.random().toString(),
			});
			
			deepEqual(await client.ZDRStorageListObjects(item), {});
		});

		it('excludes file', async function () {
			const item = ZDRScopeKey + '/';

			const client = _ZDRStorageRemoteStorage({
				ZDRScopeKey,
				ZDRParamLibrary: RemoteStorage,
			});

			await client.ZDRStorageWriteFile(item + Math.random().toString(), Math.random().toString(), 'text/plain');
			
			deepEqual(await client.ZDRStorageListObjects(item), {});
		});

		it('includes object', async function () {
			const item = ZDRScopeKey + '/';

			const path = Math.random().toString();
			const object = {
				[Math.random().toString()]: Math.random().toString(),
			};

			const client = _ZDRStorageRemoteStorage({
				ZDRScopeKey,
				ZDRParamLibrary: RemoteStorage,
			});

			await client.ZDRStorageWriteObject(item + path, object);
			
			deepEqual(await client.ZDRStorageListObjects(item), {
				[path]: object,
			});
		});
	
	});

	context('ZDRStorageListPaths', function test_ZDRStorageListPaths () {

		const ZDRScopeKey = Date.now().toString();

		it('calls scope.getListing', async function () {
			const item = Math.random().toString();
			
			await rejects(_ZDRStorageRemoteStorage({
				ZDRParamLibrary: uStubRemoteStorage({
					getListing: (function () {
						return Promise.reject([...arguments]);
					}),
				}),
			}).ZDRStorageListPaths(item), [item, false]);
		});

		it('converts folder', async function () {
			const item = ZDRScopeKey + '/';

			const path = Math.random().toString() + '/';

			const client = _ZDRStorageRemoteStorage({
				ZDRScopeKey,
				ZDRParamLibrary: RemoteStorage,
			});

			await client.ZDRStorageWriteObject(item + path + Math.random().toString(), {});
			
			deepEqual(await client.ZDRStorageListPaths(item), [path]);
		});

		it('converts file', async function () {
			const item = ZDRScopeKey + '/';

			const path = Math.random().toString();

			const client = _ZDRStorageRemoteStorage({
				ZDRScopeKey,
				ZDRParamLibrary: RemoteStorage,
			});

			await client.ZDRStorageWriteFile(item + path, Math.random().toString(), 'text/plain');
			
			deepEqual(await client.ZDRStorageListPaths(item), [path]);
		});

		it('converts object', async function () {
			const item = ZDRScopeKey + '/';

			const path = Math.random().toString();
			const object = {
				[Math.random().toString()]: Math.random().toString(),
			};

			const client = _ZDRStorageRemoteStorage({
				ZDRScopeKey,
				ZDRParamLibrary: RemoteStorage,
			});

			await client.ZDRStorageWriteObject(item + path, object);
			
			deepEqual(await client.ZDRStorageListPaths(item), [path]);
		});
	
	});

	context('ZDRStorageDelete', function test_ZDRStorageDelete () {

		it('calls scope.remove', async function () {
			const item = Math.random().toString();
			
			await rejects(_ZDRStorageRemoteStorage({
				ZDRParamLibrary: uStubRemoteStorage({
					remove: (function () {
						return Promise.reject([...arguments]);
					}),
				}),
			}).ZDRStorageDelete(item), [item]);
		});
	
	});

	context('ZDRCloudConnect', function test_ZDRCloudConnect () {

		it('calls connect', async function () {
			const item = Math.random().toString();
			
			await rejects(_ZDRStorageRemoteStorage({
				ZDRParamLibrary: uStubRemoteStorage({
					connect: (function () {
						return Promise.reject([...arguments]);
					}),
				}),
			}).ZDRCloudConnect(item), [item]);
		});
	
	});

	context('ZDRParamErrorCallback', function test_ZDRParamErrorCallback () {

		it('subscribes to error', function () {
			const item = Math.random().toString();

			deepEqual(uCapture(function (outputData) {
				_ZDRStorageRemoteStorage({
					ZDRParamLibrary: uStubRemoteStorage({
						on: (function (param1, param2) {
							if (param1 !== 'error') {
								return;
							}

							return param2(item);
						}),
					}),
					ZDRParamErrorCallback: (function () {
						outputData.push(...arguments);
					}),
				})
			}), [item]);
		});

		it('ignores if offline and sync failed', function () {
			deepEqual(uCapture(function (outputData) {
				_ZDRStorageRemoteStorage({
					ZDRParamLibrary: uStubRemoteStorage({
						on: (function (param1, param2) {
							if (param1 !== 'error') {
								return;
							}
							
							return param2(new Error('Sync failed: Network request failed.'));
						}),
						remote: {
							online: false,
						},
					}),
					ZDRParamErrorCallback: (function () {
						outputData.push(...arguments);
					}),
				})
			}), []);
		});
	
	});

	context('ZDRParamIdentityCallback', function test_ZDRParamIdentityCallback () {

		it('subscribes to connected', function () {
			const userAddress = Math.random().toString();
			
			deepEqual(uCapture(function (outputData) {
				_ZDRStorageRemoteStorage({
					ZDRParamLibrary: uStubRemoteStorage({
						on: (function (param1, param2) {
							if (param1 !== 'connected') {
								return;
							}

							return param2();
						}),
						remote: {
							userAddress,
						},
					}),
					ZDRParamIdentityCallback: (function () {
						outputData.push(...arguments);
					}),
				});
			}), [userAddress]);
		});
	
	});

	context('ZDRCloudIsOnline', function test_ZDRCloudIsOnline () {

		it('updates on network-online', function () {
			deepEqual(mod.ZDRStorage({
				ZDRParamLibrary: uStubRemoteStorage({
					on: (function (param1, param2) {
						if (param1 !== 'network-online') {
							return;
						}

						return param2();
					}),
				}),
				ZDRParamScopes: [uStubScope()],
			}).ZDRCloudIsOnline, true);
		});

		it('updates on network-offline', function () {
			deepEqual(mod.ZDRStorage({
				ZDRParamLibrary: uStubRemoteStorage({
					on: (function (param1, param2) {
						if (!['network-online', 'network-offline'].includes(param1)) {
							return;
						}

						return param2();
					}),
				}),
				ZDRParamScopes: [uStubScope()],
			}).ZDRCloudIsOnline, false);
		});
	
	});

	context('change', function () {
		
		it('skips if no _ZDRModelSyncCallbackSignatures', function () {
			deepEqual(uCapture(function (outputData) {
				_ZDRStorageRemoteStorage({
					ZDRParamLibrary: uStubRemoteStorage({
						on: (function (param1, param2) {
							if (param1 !== 'change') {
								return;
							}

							outputData.push(...arguments);
						}),
					}),
				});
			}), []);
		});

		const uChange = function (params = {}, outputData) {
			return _ZDRStorageRemoteStorage({
				ZDRScopeSchemas: [uStubSchema(mod._ZDRModelSyncCallbackSignatures().reduce(function (coll, item) {
					return Object.assign(coll, {
						[item]: (function () {
							outputData.push(...arguments);
						}),
					}, params);
				}, {
					ZDRSchemaStubCallback: (function (inputData) {
						return Object.fromEntries([inputData.split('.')]);
					}),
					ZDRSchemaPathCallback: (function (inputData) {
						return Object.entries(inputData).pop().join('.');
					}),
				}))],
				ZDRParamLibrary: uStubRemoteStorage({
					on: (function (param1, param2) {
						if (param1 !== 'change') {
							return;
						}

						return param2(Object.assign({
							origin: params.signature === 'ZDRSchemaSyncCallbackConflict' ? 'conflict' : 'remote',
							relativePath: Math.random().toString(),
						}, (function(inputData) {
							if (params.signature === 'ZDRSchemaSyncCallbackCreate') {
								return {
									newValue: Math.random().toString(),
								};
							};

							if (params.signature === 'ZDRSchemaSyncCallbackUpdate') {
								return {
									oldValue: Math.random().toString(),
									newValue: Math.random().toString(),
								};
							};

							if (params.signature === 'ZDRSchemaSyncCallbackDelete') {
								return {
									oldValue: Math.random().toString(),
								};
							};
						})()));
					}),
				}),
			});
		};
		
		it('ignores if no match', function () {
			const signature = uRandomElement(mod._ZDRModelSyncCallbackSignatures());
			deepEqual(uCapture(function (outputData) {
				uChange({
					signature,
					ZDRSchemaPathCallback: (function (inputData) {
						return Math.random().toString();
					}),
				}, outputData);
			}), []);
		});
		
		it('ignores if no signature', function () {
			deepEqual(uCapture(function (outputData) {
				uChange({
					signature: Math.random().toString(),
				}, outputData);
			}), []);
		});
		
		it('ignores if no callback', function () {
			const signature = uRandomElement(mod._ZDRModelSyncCallbackSignatures());
			deepEqual(uCapture(function (outputData) {
				uChange({
					signature,
					[signature]: undefined,
				}, outputData);
			}), []);
		});

		it('calls callback at signature', function () {
			const signature = uRandomElement(mod._ZDRModelSyncCallbackSignatures());
			deepEqual(uCapture(function (outputData) {
				uChange({
					signature,
					[signature]: (function () {
						outputData.push(signature);
					}),
				}, outputData);
			}), [signature]);
		});
	
	});
	
});
