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
		}, inputData))[ZDRScopeKey];
	};

	context('ZDRStorageWriteObject', function test_ZDRStorageWriteObject () {

		it('calls client.access.claim', function () {
			const item = [];

			const ZDRScopeKey = Math.random().toString();

			_ZDRStorageRemoteStorage({
				ZDRScopeKey,
				ZDRParamLibrary: uRemoteStorage({
					claim: (function () {
						item.push(...arguments);
					}),
				}),
			})

			deepEqual(item, [ZDRScopeKey, 'rw']);
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

		it('excludes folders', async function () {
			const item = ZDRScopeKey + '/';

			const client = _ZDRStorageRemoteStorage({
				ZDRScopeKey,
				ZDRParamLibrary: RemoteStorage,
			});

			await client.ZDRStorageWriteObject(item + 'bravo/charlie', {
				[Math.random().toString()]: Math.random().toString(),
			});
			
			deepEqual(await client.ZDRStorageListObjects(item), {});
		});

		it('excludes files', async function () {
			const item = ZDRScopeKey + '/';

			const client = _ZDRStorageRemoteStorage({
				ZDRScopeKey,
				ZDRParamLibrary: RemoteStorage,
			});

			await client.ZDRStorageWriteFile(item + 'bravo', Math.random().toString(), 'text/plain');
			
			deepEqual(await client.ZDRStorageListObjects(item), {});
		});

		it('includes objects', async function () {
			const item = ZDRScopeKey + '/';
			const param2 = {
				[Math.random().toString()]: Math.random().toString(),
			};

			const client = _ZDRStorageRemoteStorage({
				ZDRScopeKey,
				ZDRParamLibrary: RemoteStorage,
			});

			await client.ZDRStorageWriteObject(item + 'param2', param2);
			
			deepEqual(await client.ZDRStorageListObjects(item), {
				param2,
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

			const client = _ZDRStorageRemoteStorage({
				ZDRScopeKey,
				ZDRParamLibrary: RemoteStorage,
			});

			await client.ZDRStorageWriteObject(item + 'bravo/charlie', {});
			
			deepEqual(await client.ZDRStorageListPaths(item), ['bravo/']);
		});

		it('converts file', async function () {
			const item = ZDRScopeKey + '/';

			const client = _ZDRStorageRemoteStorage({
				ZDRScopeKey,
				ZDRParamLibrary: RemoteStorage,
			});

			await client.ZDRStorageWriteFile(item + 'bravo', Math.random().toString(), 'text/plain');
			
			deepEqual(await client.ZDRStorageListPaths(item), ['bravo']);
		});

		it('converts object', async function () {
			const item = ZDRScopeKey + '/';
			const param2 = {
				[Math.random().toString()]: Math.random().toString(),
			};

			const client = _ZDRStorageRemoteStorage({
				ZDRScopeKey,
				ZDRParamLibrary: RemoteStorage,
			});

			await client.ZDRStorageWriteObject(item + 'bravo', param2);
			
			deepEqual(await client.ZDRStorageListPaths(item), ['bravo']);
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
	
});
