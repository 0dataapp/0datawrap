const { rejects, deepEqual } = require('assert');

const mod = require('./main.js');

const RemoteStorage = require('remotestoragejs');

describe('_ZDRModelSyncCallbackSignature', function test__ZDRModelSyncCallbackSignature() {

	it('returns undefined', function () {
		deepEqual(mod._ZDRModelSyncCallbackSignature(), undefined);
	});

	it('returns undefined if window', function () {
		deepEqual(mod._ZDRModelSyncCallbackSignature({
			origin: 'window',
		}), undefined);
	});

	it('returns undefined if local init', function () {
		deepEqual(mod._ZDRModelSyncCallbackSignature({
			origin: 'local',
		}), undefined);
	});

	it('returns string if remote create', function () {
		deepEqual(mod._ZDRModelSyncCallbackSignature({
			origin: 'remote',
			oldValue: undefined,
			newValue: Math.random().toString(),
		}), 'ZDRSchemaDispatchSyncCreate');
	});

	it('returns string if remote update', function () {
		deepEqual(mod._ZDRModelSyncCallbackSignature({
			origin: 'remote',
			oldValue: Math.random().toString(),
			newValue: Math.random().toString(),
		}), 'ZDRSchemaDispatchSyncUpdate');
	});

	it('returns string if remote delete', function () {
		deepEqual(mod._ZDRModelSyncCallbackSignature({
			origin: 'remote',
			oldValue: Math.random().toString(),
			newValue: undefined,
		}), 'ZDRSchemaDispatchSyncDelete');
	});

	it('returns string if conflict', function () {
		deepEqual(mod._ZDRModelSyncCallbackSignature({
			origin: 'conflict',
		}), 'ZDRSchemaDispatchSyncConflict');
	});

});

describe('_ZDRWrap_RemoteStorage', function test__ZDRWrap_RemoteStorage() {

	const ZDRScopeDirectory = Date.now().toString();

	const uScopePath = function (inputData) {
		return `${ inputData }`;
	};

	const _ZDRStorageRemoteStorage = function (inputData = {}) {
		const ZDRScopeKey = inputData.ZDRScopeKey || Math.random().toString();
		const _ZDRScopeDirectory = inputData.ZDRScopeDirectory || ZDRScopeDirectory;

		return mod._ZDRWrap(Object.assign({
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

		deepEqual(uCapture(function (capture) {
			_ZDRStorageRemoteStorage({
				ZDRScopeDirectory,
				ZDRParamLibrary: uStubRemoteStorage({
					claim: (function () {
						capture(...arguments);
					}),
				}),
			});
		}), [ZDRScopeDirectory, 'rw']);
	});

	it('calls client.caching.enable', function () {
		const ZDRScopeDirectory = Math.random().toString();

		deepEqual(uCapture(function (capture) {
			_ZDRStorageRemoteStorage({
				ZDRScopeDirectory,
				ZDRParamLibrary: uStubRemoteStorage({
					enable: (function () {
						capture(...arguments);
					}),
				}),
			});
		}), [`/${ ZDRScopeDirectory }/`]);
	});

	context('error', function () {

		it('calls ZDRParamDispatchError', function () {
			const item = Math.random().toString();

			deepEqual(uCapture(function (capture) {
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
						capture(...arguments);
					}),
				});
			}), [item]);
		});

		it('ignores if offline and sync failed', function () {
			deepEqual(uCapture(function (capture) {
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
						capture(...arguments);
					}),
				});
			}), []);
		});

	});

	context('ready', function () {

		it('calls ZDRParamDispatchReady', function () {
			const item = Math.random().toString();
			deepEqual(uCapture(function (capture) {
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
						capture(item);
					}),
				});
			}), [item]);
		});

	});

	context('connected', function () {

		it('calls ZDRParamDispatchConnected', function () {
			const userAddress = Math.random().toString();
			const token = Math.random().toString();

			deepEqual(uCapture(function (capture) {
				mod._ZDRWrap({
					ZDRParamLibrary: uStubRemoteStorage({
						on: (function (param1, param2) {
							if (param1 !== 'connected') {
								return;
							}

							return param2();
						}),
						remote: {
							userAddress,
							token,
						},
					}),
					ZDRParamScopes: [uStubScope()],
					ZDRParamDispatchReady: (function () {}),
					ZDRParamDispatchConnected: (function () {
						capture(...arguments);
					}),
				});
			}), [userAddress, token]);
		});

	});

	context('network-online', function () {

		it('calls ZDRParamDispatchOnline', function () {
			const item = Math.random().toString();
			deepEqual(uCapture(function (capture) {
				mod._ZDRWrap({
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
						capture(item);
					}),
					ZDRParamDispatchReady: (function () {}),
				});
			}), [item]);
		});

	});

	context('network-offline', function () {

		it('calls ZDRParamDispatchOffline', function () {
			const item = Math.random().toString();
			deepEqual(uCapture(function (capture) {
				mod._ZDRWrap({
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
						capture(item);
					}),
					ZDRParamDispatchReady: (function () {}),
				});
			}), [item]);
		});

	});

	context('sync-done', function () {

		it('calls ZDRParamDispatchSyncDidStop', function () {
			const item = Math.random().toString();
			deepEqual(uCapture(function (capture) {
				mod._ZDRWrap({
					ZDRParamLibrary: uStubRemoteStorage({
						on: (function (param1, param2) {
							if (param1 !== 'sync-done') {
								return;
							}

							return param2();
						}),
					}),
					ZDRParamScopes: [uStubScope()],
					ZDRParamDispatchSyncDidStop: (function () {
						capture(item);
					}),
					ZDRParamDispatchReady: (function () {}),
				});
			}), [item]);
		});

	});

	context('ZDRStorageWriteFile', function test_ZDRStorageWriteFile() {

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

	context('ZDRStorageWriteObject', function test_ZDRStorageWriteObject() {

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

	context('ZDRStorageReadFile', function test_ZDRStorageReadFile() {

		it('calls scope.getFile', function () {
			const item = Math.random().toString();

			deepEqual(uCapture(function (capture) {
				_ZDRStorageRemoteStorage({
					ZDRParamLibrary: uStubRemoteStorage({
						getFile: capture,
					}),
				}).ZDRStorageReadFile(item)
			}), [uScopePath(item), false]);
		});

	});

	context('ZDRStorageReadObject', function test_ZDRStorageReadObject() {

		it('calls scope.getFile', function () {
			const item = Math.random().toString();

			deepEqual(uCapture(function (capture) {
				_ZDRStorageRemoteStorage({
					ZDRParamLibrary: uStubRemoteStorage({
						getFile: capture,
					}),
				}).ZDRStorageReadObject(item)
			}), [uScopePath(item), false]);
		});

	});

	context('ZDRStorageListObjects', function test_ZDRStorageListObjects() {

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

	context('ZDRStoragePaths', function test_ZDRStoragePaths() {

		const ZDRScopeKey = Date.now().toString();

		it('calls scope.getListing', async function () {
			const item = Math.random().toString();

			await rejects(_ZDRStorageRemoteStorage({
				ZDRParamLibrary: uStubRemoteStorage({
					getListing: (function () {
						return Promise.reject([...arguments]);
					}),
				}),
			}).ZDRStoragePaths(item), [uScopePath(mod._ZDRPathFormatDirectory(item)), false]);
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

	context('ZDRStorageDeleteFile', function test_ZDRStorageDeleteFile() {

		it('calls scope.remove', async function () {
			const item = Math.random().toString();

			await rejects(_ZDRStorageRemoteStorage({
				ZDRParamLibrary: uStubRemoteStorage({
					remove: (function () {
						return Promise.reject([...arguments]);
					}),
				}),
			}).ZDRStorageDeleteFile(item), [uScopePath(item)]);
		});

	});

	context('ZDRCloudConnect', function test_ZDRCloudConnect() {

		it('calls connect', async function () {
			const item = Math.random().toString();
			await rejects(mod._ZDRWrap({
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

	context('ZDRCloudReconnect', function test_ZDRCloudReconnect() {

		it('calls reconnect', async function () {
			const item = Math.random().toString();
			await rejects(mod._ZDRWrap({
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

	context('ZDRCloudDisconnect', function test_ZDRCloudDisconnect() {

		it('calls disconnect', async function () {
			const item = Math.random().toString();

			await rejects(mod._ZDRWrap({
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
			deepEqual(uCapture(function (capture) {
				_ZDRStorageRemoteStorage({
					ZDRParamLibrary: uStubRemoteStorage({
						on: (function (param1, param2) {
							if (param1 !== 'change') {
								return;
							}

							capture(...arguments);
						}),
					}),
				});
			}), []);
		});

		const uChange = function (params = {}) {
			return _ZDRStorageRemoteStorage({
				ZDRScopeSchemas: [uStubSchema(mod._ZDRModelSyncCallbackSignatures().reduce(function (coll, item) {
					return Object.assign(coll, {
						[item]: (function () {
							capture(...arguments);
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
						}, (function (inputData) {
							if (params.signature === 'ZDRSchemaDispatchSyncCreate') {
								return {
									newValue: Math.random().toString(),
								};
							}

							if (params.signature === 'ZDRSchemaDispatchSyncUpdate') {
								return {
									oldValue: Math.random().toString(),
									newValue: Math.random().toString(),
								};
							}

							if (params.signature === 'ZDRSchemaDispatchSyncDelete') {
								return {
									oldValue: Math.random().toString(),
								};
							}
						})()));
					}),
				}),
			});
		};

		it('ignores if no match', function () {
			const signature = uRandomElement(mod._ZDRModelSyncCallbackSignatures());
			deepEqual(uCapture(function (capture) {
				uChange({
					signature,
					ZDRSchemaPath: (function (inputData) {
						return Math.random().toString();
					}),
				});
			}), []);
		});

		it('ignores if no signature', function () {
			deepEqual(uCapture(function (capture) {
				uChange({
					signature: Math.random().toString(),
				});
			}), []);
		});

		it('ignores if no callback', function () {
			const signature = uRandomElement(mod._ZDRModelSyncCallbackSignatures());
			deepEqual(uCapture(function (capture) {
				uChange({
					signature,
					[signature]: undefined,
				});
			}), []);
		});

		it('calls callback at signature', function () {
			const signature = uRandomElement(mod._ZDRModelSyncCallbackSignatures());
			deepEqual(uCapture(function (capture) {
				uChange({
					signature,
					[signature]: (function () {
						capture(signature);
					}),
				});
			}), [signature]);
		});

	});

});
