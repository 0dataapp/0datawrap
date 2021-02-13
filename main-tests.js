const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

const uRemoteStorage = function (inputData = {}) {
	const RemoteStorage = function () {};

	RemoteStorage.Authorize = Math.random().toString();

	return RemoteStorage;
};

describe('ZDRStorage', function test_ZDRStorage () {

	const _ZDRStorage = function (inputData = {}) {
		return mod.ZDRStorage(Object.assign({
			ZDRParamLibrary: uRemoteStorage(),
		}, inputData));
	};

	it('throws if not object', function() {
		throws(function() {
			mod.ZDRStorage(null);
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ZDRParamLibrary not valid', function() {
		throws(function() {
			_ZDRStorage({
				ZDRParamLibrary: null,
			});
		}, /ZDRErrorInputNotValid/);
	});

	it('returns object', function () {
		deepEqual(typeof _ZDRStorage(), 'object');
	});
	
});
