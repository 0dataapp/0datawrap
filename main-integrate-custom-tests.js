const { rejects, deepEqual } = require('assert');

const mod = require('./main.js');

describe('_ZDRWrap_Custom', function test__ZDRWrap_Custom () {

	context('ZDRParamDispatchReady', function test_ZDRParamDispatchReady () {

		it('calls immediately', async function () {
			const item = Math.random().toString();
			deepEqual(await (new Promise(function (res, rej) {
				mod._ZDRWrap({
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
				mod._ZDRWrap({
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

	context('ZDRCloudReconnect', function test_ZDRCloudReconnect () {

		it('calls ZDRClientConnect', async function () {
			const item = Math.random().toString();
			deepEqual(uCapture(function (capture) {
				mod._ZDRWrap({
					ZDRParamLibrary: uStubCustomClient({
						ZDRClientConnect: (function () {
							capture(item);
						}),
					}),
					ZDRParamScopes: [uStubScope()],
					ZDRParamDispatchReady: (function () {}),
				}).ZDRCloudReconnect()
			}), [item]);
		});

		it('calls ZDRClientReconnect if defined', async function () {
			const item = Math.random().toString();
			deepEqual(uCapture(function (capture) {
				mod._ZDRWrap({
					ZDRParamLibrary: uStubCustomClient({
						ZDRClientReconnect: (function () {
							capture(item);
						}),
						ZDRClientConnect: (function () {
							capture(Math.random().toString());
						}),
					}),
					ZDRParamScopes: [uStubScope()],
					ZDRParamDispatchReady: (function () {}),
				}).ZDRCloudReconnect()
			}), [item]);
		});
	
	});
	
});
