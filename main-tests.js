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

	context('ZDRStorageWriteObject', function test_ZDRStorageWriteObject () {

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

	context('ZDRStorageWriteFile', function test_ZDRStorageWriteFile () {

		const param3 = Date.now().toString() + '/' + Date.now().toString();

		it('throws if param1 not string', function() {
			throws(function() {
				__ZDRStorage().ZDRStorageWriteFile(null, {}, param3);
			}, /ZDRErrorInputNotValid/);
		});
		
		it('throws if param3 not string', function() {
			throws(function() {
				__ZDRStorage().ZDRStorageWriteFile(Math.random().toString(), {}, null);
			}, /ZDRErrorInputNotValid/);
		});
		
		it('returns param2', async function () {
			const item = Math.random().toString();
			deepEqual(await __ZDRStorage().ZDRStorageWriteFile(Math.random().toString(), item, param3), item);
		});
	
	});

	context('ZDRStorageReadObject', function test_ZDRStorageReadObject () {

		it('throws if not string', function() {
			throws(function() {
				__ZDRStorage().ZDRStorageReadObject(null);
			}, /ZDRErrorInputNotValid/);
		});

		it('returns null', function () {
			deepEqual(__ZDRStorage().ZDRStorageReadObject(Math.random().toString()), null);
		});
	
	});

	context('ZDRStorageListObjects', function test_ZDRStorageListObjects () {

		it('throws if not string', function() {
			throws(function() {
				__ZDRStorage().ZDRStorageListObjects(null);
			}, /ZDRErrorInputNotValid/);
		});

		it('returns object', async function () {
			deepEqual(await __ZDRStorage().ZDRStorageListObjects(Math.random().toString()), {});
		});
	
	});

	context('ZDRStorageListDetails', function test_ZDRStorageListDetails () {

		it('throws if not string', function() {
			throws(function() {
				__ZDRStorage().ZDRStorageListDetails(null);
			}, /ZDRErrorInputNotValid/);
		});

		it('returns object', async function () {
			deepEqual(await __ZDRStorage().ZDRStorageListDetails(Math.random().toString()), {});
		});
	
	});

	context('ZDRStorageDelete', function test_ZDRStorageDelete () {

		it('throws if not string', function() {
			throws(function() {
				__ZDRStorage().ZDRStorageDelete(null);
			}, /ZDRErrorInputNotValid/);
		});

		it('returns null', function () {
			deepEqual(__ZDRStorage().ZDRStorageDelete(Math.random().toString()), null);
		});
	
	});
	
});
