const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

const uRemoteStorage = function (inputData = {}) {
	const RemoteStorage = function () {};

	RemoteStorage.Authorize = Math.random().toString();

	return RemoteStorage;
};

describe('_ZDRScopesObjectValidate', function test__ZDRScopesObjectValidate () {

	const __ZDRScopesObjectValidate = function (inputData = {}) {
		return mod._ZDRScopesObjectValidate(Object.assign({
			ZDRScopeKey: Math.random().toString(),
		}, inputData));
	};

	it('throws if not object', function() {
		throws(function() {
			mod._ZDRScopesObjectValidate(null);
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ZDRScopeKey not string', function() {
		throws(function() {
			__ZDRScopesObjectValidate({
				ZDRScopeKey: null,
			});
		}, /ZDRErrorInputNotString/);
	});

	it('throws if ZDRScopeKey not filled', function() {
		throws(function() {
			__ZDRScopesObjectValidate({
				ZDRScopeKey: ' ',
			});
		}, /ZDRErrorInputNotFilled/);
	});

	it('throws if ZDRScopeKey not trimmed', function() {
		throws(function() {
			__ZDRScopesObjectValidate({
				ZDRScopeKey: ' ' + Math.random().toString() + ' ',
			});
		}, /ZDRErrorInputNotTrimmed/);
	});

	it('returns true', function () {
		deepEqual(__ZDRScopesObjectValidate(), true);
	});

});

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
