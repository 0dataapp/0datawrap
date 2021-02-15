const { rejects, deepEqual } = require('assert');

const mod = require('./main.js');

const RemoteStorage = require('remotestoragejs');

describe('ZDRStorage_RemoteStorage', function test_ZDRStorage_RemoteStorage () {

	const _ZDRStorageRemoteStorage = function (inputData = {}) {
		const ZDRScopeKey = inputData.ZDRScopeKey || Math.random().toString();

		return mod.ZDRStorage(Object.assign({
			ZDRParamScopes: [Object.assign({
				ZDRScopeKey,
			}, inputData)],
			ZDRParamErrorCallback: (function () {}),
			ZDRParamIdentityCallback: (function () {}),
		}, inputData))[ZDRScopeKey];
	};

	context('ZDRStorageWriteObject', function test_ZDRStorageWriteObject () {

		it('calls client.access.claim', function () {
			const ZDRScopeKey = Math.random().toString();

			deepEqual(uCapture(function (outputData) {
				_ZDRStorageRemoteStorage({
					ZDRScopeKey,
					ZDRParamLibrary: uRemoteStorage({
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
				ZDRParamLibrary: uRemoteStorage({
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
				ZDRParamLibrary: uRemoteStorage({
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
				ZDRParamLibrary: uRemoteStorage({
					getObject: (function () {
						return Promise.reject([...arguments]);
					}),
				}),
			}).ZDRStorageReadObject(item), [item, false]);
		});
	
	});

	context('ZDRStorageListObjects', function test_ZDRStorageListObjects () {

		const ZDRScopeKey = Date.now().toString();

		it('calls scope.getAll', async function () {
			const item = Math.random().toString();
			
			await rejects(_ZDRStorageRemoteStorage({
				ZDRParamLibrary: uRemoteStorage({
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
				ZDRParamLibrary: uRemoteStorage({
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
				ZDRParamLibrary: uRemoteStorage({
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
				ZDRParamLibrary: uRemoteStorage({
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
					ZDRParamLibrary: uRemoteStorage({
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
					ZDRParamLibrary: uRemoteStorage({
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
					ZDRParamLibrary: uRemoteStorage({
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
	
});
