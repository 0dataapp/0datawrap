const { rejects, deepEqual } = require('assert');

const mod = require('./main.js');

describe('ZDRWrap_Custom', function test_ZDRWrap_Custom () {

	context('ZDRParamDispatchReady', function test_ZDRParamDispatchReady () {

		it('calls immediately', async function () {
			const item = Math.random().toString();
			deepEqual(await (new Promise(function (res, rej) {
				mod.ZDRWrap({
					ZDRParamLibrary: uStubCustomClient(),
					ZDRParamScopes: [uStubScope()],
					ZDRParamDispatchReady: (function () {
						return res([item])
					}),
				})
			})), [item]);
		});

		it('calls after ZDRClientPrepare if defined', async function () {
			const item = Math.random().toString();
			deepEqual(await (new Promise(function (res, rej) {
				mod.ZDRWrap({
					ZDRParamLibrary: uStubCustomClient({
						ZDRClientPrepare: (function () {
							return Promise.resolve(item)
						}),
					}),
					ZDRParamScopes: [uStubScope()],
					ZDRParamDispatchReady: (function () {
						return res(...arguments)
					}),
				})
			})), item);
		});
	
	});
	
});
