const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

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
			ZDRParamScopes: [Object.assign({
				ZDRScopeKey: Math.random().toString(),
			}, inputData)],
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

	it('throws if ZDRParamScopes not array', function() {
		throws(function() {
			_ZDRStorage({
				ZDRParamScopes: null,
			});
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ZDRParamScopes not filled', function() {
		throws(function() {
			_ZDRStorage({
				ZDRParamScopes: [],
			});
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ZDRParamScopes element not valid', function() {
		throws(function() {
			_ZDRStorage({
				ZDRParamScopes: [{
					ZDRScopeKey: null,
				}],
			});
		}, /ZDRErrorInputNotString/);
	});

	it('returns object', function () {
		deepEqual(typeof _ZDRStorage(), 'object');
	});

	const __ZDRStorage = function (inputData = {}) {
		const ZDRScopeKey = Math.random().toString();

		return _ZDRStorage(Object.assign({
			ZDRScopeKey,
		}, inputData))[ZDRScopeKey];
	};

	context('ZDRStorageWriteObject', function () {

		it('throws if param1 not string', function() {
			throws(function() {
				__ZDRStorage().ZDRStorageWriteObject(null, {});
			}, /ZDRErrorInputNotValid/);
		});
		
		it('throws if param2 not object', function() {
			throws(function() {
				__ZDRStorage().ZDRStorageWriteObject(Math.random().toString(), null);
			}, /ZDRErrorInputNotValid/);
		});

		it('returns param2', async function () {
			const item = {
				[Math.random().toString()]: Math.random().toString(),
			};
			deepEqual(await __ZDRStorage().ZDRStorageWriteObject(Math.random().toString(), item), item);
		});
	
	});
	
});
