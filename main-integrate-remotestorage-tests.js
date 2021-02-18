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
		}), 'ZDRSchemaDispatchSyncCreate');
	});

	it('returns string if remote update', function() {
		deepEqual(mod._ZDRModelSyncCallbackSignature({
			origin: 'remote',
			oldValue: Math.random().toString(),
			newValue: Math.random().toString(),
		}), 'ZDRSchemaDispatchSyncUpdate');
	});

	it('returns string if remote delete', function() {
		deepEqual(mod._ZDRModelSyncCallbackSignature({
			origin: 'remote',
			oldValue: Math.random().toString(),
			newValue: undefined,
		}), 'ZDRSchemaDispatchSyncDelete');
	});

	it('returns string if conflict', function() {
		deepEqual(mod._ZDRModelSyncCallbackSignature({
			origin: 'conflict',
		}), 'ZDRSchemaDispatchSyncConflict');
	});

});

describe('ZDRWrap_RemoteStorage', function test_ZDRWrap_RemoteStorage () {

	const ZDRScopeDirectory = Date.now().toString();

	const uScopePath = function (inputData) {
		return `${ inputData }`;
	};

	const _ZDRStorageRemoteStorage = function (inputData = {}) {
		const ZDRScopeKey = inputData.ZDRScopeKey || Math.random().toString();
		const _ZDRScopeDirectory = inputData.ZDRScopeDirectory || ZDRScopeDirectory;

		return mod.ZDRWrap(Object.assign({
			ZDRParamLibrary: RemoteStorage,
			ZDRParamScopes: [uStubScope(Object.assign({
				ZDRScopeKey,
				ZDRScopeDirectory: _ZDRScopeDirectory,
			}, inputData))],
			ZDRParamDispatchReady: (function () {}),
		}, inputData))[ZDRScopeKey];
	};

	it('calls client.access.claim', function () {
		const ZDRScopeDirectory = Math.random().toString();

		deepEqual(uCapture(function (outputData) {
			_ZDRStorageRemoteStorage({
				ZDRScopeDirectory,
				ZDRParamLibrary: uStubRemoteStorage({
					claim: (function () {
						outputData.push(...arguments);
					}),
				}),
			})
		}), [ZDRScopeDirectory, 'rw']);
	});

	it('calls client.caching.enable', function () {
		const ZDRScopeDirectory = Math.random().toString();

		deepEqual(uCapture(function (outputData) {
			_ZDRStorageRemoteStorage({
				ZDRScopeDirectory,
				ZDRParamLibrary: uStubRemoteStorage({
					enable: (function () {
						outputData.push(...arguments);
					}),
				}),
			})
		}), [`/${ ZDRScopeDirectory }/`]);
	});

	context('error', function () {

		it('calls ZDRParamDispatchError', function () {
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
					ZDRParamDispatchError: (function () {
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
					ZDRParamDispatchError: (function () {
						outputData.push(...arguments);
					}),
				})
			}), []);
		});
	
	});

	context('ready', function () {

		it('calls ZDRParamDispatchReady', function () {
			const item = Math.random().toString();
			deepEqual(uCapture(function (outputData) {
				_ZDRStorageRemoteStorage({
					ZDRParamLibrary: uStubRemoteStorage({
						on: (function (param1, param2) {
							if (param1 !== 'ready') {
								return;
							}

							return param2();
						}),
					}),
					ZDRParamDispatchReady: (function () {
						outputData.push(item);
					}),
				});
			}), [item]);
		});
	
	});

	context('connected', function () {

		it('calls ZDRParamDispatchConnected', function () {
			const userAddress = Math.random().toString();

			deepEqual(uCapture(function (outputData) {
				mod.ZDRWrap({
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
					ZDRParamScopes: [uStubScope()],
					ZDRParamDispatchReady: (function () {}),
					ZDRParamDispatchConnected: (function () {
						outputData.push(...arguments);
					}),
				})
			}), [userAddress]);
		});

	});

	context('network-online', function () {

		it('calls ZDRParamDispatchOnline', function () {
			const item = Math.random().toString();
			deepEqual(uCapture(function (outputData) {
				mod.ZDRWrap({
					ZDRParamLibrary: uStubRemoteStorage({
						on: (function (param1, param2) {
							if (param1 !== 'network-online') {
								return;
							}

							return param2();
						}),
					}),
					ZDRParamScopes: [uStubScope()],
					ZDRParamDispatchOnline: (function () {
						outputData.push(item);
					}),
					ZDRParamDispatchReady: (function () {}),
				})
			}), [item]);
		});

	});

	context('network-offline', function () {

		it('calls ZDRParamDispatchOffline', function () {
			const item = Math.random().toString();
			deepEqual(uCapture(function (outputData) {
				mod.ZDRWrap({
					ZDRParamLibrary: uStubRemoteStorage({
						on: (function (param1, param2) {
							if (param1 !== 'network-offline') {
								return;
							}

							return param2();
						}),
					}),
					ZDRParamScopes: [uStubScope()],
					ZDRParamDispatchOffline: (function () {
						outputData.push(item);
					}),
					ZDRParamDispatchReady: (function () {}),
				})
			}), [item]);
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
			}).ZDRStorageWriteObject(param1, param2), ['application/json', uScopePath(param1), JSON.stringify(param2)]);
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
			}).ZDRStorageWriteFile(param1, param2, param3), [param3, uScopePath(param1), param2]);
		});
	
	});

	context('ZDRStorageReadObject', function test_ZDRStorageReadObject () {

		it('calls scope.getObject', async function () {
			const item = Math.random().toString();
			
			deepEqual(await _ZDRStorageRemoteStorage({
				ZDRParamLibrary: uStubRemoteStorage({
					getObject: (function () {
						return [...arguments];
					}),
				}),
			}).ZDRStorageReadObject(item), [uScopePath(item), false]);
		});
	
	});

	context('ZDRStorageReadFile', function test_ZDRStorageReadFile () {

		it('calls scope.getFile', async function () {
			const item = Math.random().toString();
			
			deepEqual(await _ZDRStorageRemoteStorage({
				ZDRParamLibrary: uStubRemoteStorage({
					getFile: (function () {
						return [...arguments];
					}),
				}),
			}).ZDRStorageReadFile(item), [uScopePath(item), false]);
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
			}).ZDRStorageListObjects(item), [uScopePath(item), false]);
		});

		it('excludes folder', async function () {
			const client = _ZDRStorageRemoteStorage();

			await client.ZDRStorageWriteObject(Date.now().toString() + '/' + Math.random().toString(), {
				[Math.random().toString()]: Math.random().toString(),
			});
			
			deepEqual(await client.ZDRStorageListObjects(uRandomElement('', '/')), {});
		});

		it('excludes file', async function () {
			const client = _ZDRStorageRemoteStorage();

			await client.ZDRStorageWriteFile(Math.random().toString(), Math.random().toString(), 'text/plain');
			
			deepEqual(await client.ZDRStorageListObjects(uRandomElement('', '/')), {});
		});

		it('includes object', async function () {
			const path = Math.random().toString();
			const object = {
				[Math.random().toString()]: Math.random().toString(),
			};

			const client = _ZDRStorageRemoteStorage();

			await client.ZDRStorageWriteObject(path, object);
			
			deepEqual(await client.ZDRStorageListObjects(uRandomElement('', '/')), {
				[path]: object,
			});
		});
	
	});

	context('ZDRStoragePaths', function test_ZDRStoragePaths () {

		const ZDRScopeKey = Date.now().toString();

		it('calls scope.getListing', async function () {
			const item = Math.random().toString();
			
			await rejects(_ZDRStorageRemoteStorage({
				ZDRParamLibrary: uStubRemoteStorage({
					getListing: (function () {
						return Promise.reject([...arguments]);
					}),
				}),
			}).ZDRStoragePaths(item), [uScopePath(item), false]);
		});

		it('converts folder', async function () {
			const path = Math.random().toString();

			const client = _ZDRStorageRemoteStorage();

			await client.ZDRStorageWriteObject(path + '/' + Math.random().toString(), {});
			
			deepEqual(await client.ZDRStoragePaths(uRandomElement('', '/')), [path + '/']);
		});

		it('converts file', async function () {
			const path = Math.random().toString();

			const client = _ZDRStorageRemoteStorage();

			await client.ZDRStorageWriteFile(path, Math.random().toString(), 'text/plain');
			
			deepEqual(await client.ZDRStoragePaths(uRandomElement('', '/')), [path]);
		});

		it('converts object', async function () {
			const path = Math.random().toString();
			const object = {
				[Math.random().toString()]: Math.random().toString(),
			};

			const client = _ZDRStorageRemoteStorage({
				ZDRScopeKey,
			});

			await client.ZDRStorageWriteObject(path, object);
			
			deepEqual(await client.ZDRStoragePaths(uRandomElement('', '/')), [path]);
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
			}).ZDRStorageDelete(item), [uScopePath(item)]);
		});
	
	});

	context('ZDRCloudConnect', function test_ZDRCloudConnect () {

		it('calls connect', async function () {
			const item = Math.random().toString();
			await rejects(mod.ZDRWrap({
				ZDRParamLibrary: uStubRemoteStorage({
					connect: (function () {
						return Promise.reject([...arguments]);
					}),
				}),
				ZDRParamScopes: [uStubScope()],
				ZDRParamDispatchReady: (function () {}),
			}).ZDRCloudConnect(item), [item]);
		});
	
	});

	context('ZDRCloudReconnect', function test_ZDRCloudReconnect () {

		it('calls reconnect', async function () {
			const item = Math.random().toString();
			await rejects(mod.ZDRWrap({
				ZDRParamLibrary: uStubRemoteStorage({
					reconnect: (function () {
						return Promise.reject([item]);
					}),
				}),
				ZDRParamScopes: [uStubScope()],
				ZDRParamDispatchReady: (function () {}),
			}).ZDRCloudReconnect(), [item]);
		});
	
	});

	context('ZDRCloudDisconnect', function test_ZDRCloudDisconnect () {

		it('calls disconnect', async function () {
			const item = Math.random().toString();
			
			await rejects(mod.ZDRWrap({
				ZDRParamLibrary: uStubRemoteStorage({
					disconnect: (function () {
						return Promise.reject([item]);
					}),
				}),
				ZDRParamScopes: [uStubScope()],
				ZDRParamDispatchReady: (function () {}),
			}).ZDRCloudDisconnect(), [item]);
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
					ZDRSchemaStub: (function (inputData) {
						return Object.fromEntries([inputData.split('.')]);
					}),
					ZDRSchemaPath: (function (inputData) {
						return Object.entries(inputData).pop().join('.');
					}),
				}))],
				ZDRParamLibrary: uStubRemoteStorage({
					on: (function (param1, param2) {
						if (param1 !== 'change') {
							return;
						}

						return param2(Object.assign({
							origin: params.signature === 'ZDRSchemaDispatchSyncConflict' ? 'conflict' : 'remote',
							relativePath: Math.random().toString(),
						}, (function(inputData) {
							if (params.signature === 'ZDRSchemaDispatchSyncCreate') {
								return {
									newValue: Math.random().toString(),
								};
							};

							if (params.signature === 'ZDRSchemaDispatchSyncUpdate') {
								return {
									oldValue: Math.random().toString(),
									newValue: Math.random().toString(),
								};
							};

							if (params.signature === 'ZDRSchemaDispatchSyncDelete') {
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
					ZDRSchemaPath: (function (inputData) {
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
