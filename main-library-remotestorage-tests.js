const { rejects, deepEqual } = require('assert');

const mod = require('./main.js');

const RemoteStorage = require('remotestoragejs');

describe('ZDRStorage_RemoteStorage', function test_ZDRStorage_RemoteStorage () {

	const _ZDRStorageRemoteStorage = function (inputData = {}) {
		const ZDRScopeKey = Math.random().toString();

		return mod.ZDRStorage(Object.assign({
			ZDRParamScopes: [Object.assign({
				ZDRScopeKey,
			}, inputData)],
		}, inputData))[ZDRScopeKey];
	};

	context('ZDRStorageWriteObject', function () {

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

	context('ZDRStorageWriteFile', function () {

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

	context('ZDRStorageReadObject', function () {

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

	context('ZDRStorageListObjects', function () {

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
			const item = Date.now().toString() + '/';

			const client = _ZDRStorageRemoteStorage({
				ZDRParamLibrary: RemoteStorage,
			});

			await client.ZDRStorageWriteObject(item + 'bravo/charlie', {
				[Math.random().toString()]: Math.random().toString(),
			});
			
			deepEqual(await client.ZDRStorageListObjects(item), {});
		});

		it('excludes files', async function () {
			const item = Date.now().toString() + '/';

			const client = _ZDRStorageRemoteStorage({
				ZDRParamLibrary: RemoteStorage,
			});

			await client.ZDRStorageWriteFile(item + 'bravo', Math.random().toString(), 'text/plain');
			
			deepEqual(await client.ZDRStorageListObjects(item), {});
		});

		it('includes objects', async function () {
			const item = Date.now().toString() + '/';
			const param2 = {
				[Math.random().toString()]: Math.random().toString(),
			};

			const client = _ZDRStorageRemoteStorage({
				ZDRParamLibrary: RemoteStorage,
			});

			await client.ZDRStorageWriteObject(item + 'param2', param2);
			
			deepEqual(await client.ZDRStorageListObjects(item), {
				param2,
			});
		});
	
	});

	context('ZDRStorageDelete', function () {

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
