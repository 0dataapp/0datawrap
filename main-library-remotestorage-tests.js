const { rejects, deepEqual } = require('assert');

const mod = require('./main.js');

describe('ZDRStorage_RemoteStorage', function test_ZDRStorage_RemoteStorage () {

	const _ZDRStorageRemoteStorage = function (inputData = {}) {
		const ZDRScopeKey = Math.random().toString();

		return mod.ZDRStorage(Object.assign({
			ZDRParamLibrary: uRemoteStorage(),
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

	context('ZDRStorageReadObject', function () {

		it('calls scope.getObject', async function () {
			const item = Math.random().toString();
			
			await rejects(_ZDRStorageRemoteStorage({
				ZDRParamLibrary: uRemoteStorage({
					getObject: (function () {
						return Promise.reject([...arguments]);
					}),
				}),
			}).ZDRStorageReadObject(item), [item, true]);
		});
	
	});
	
});
