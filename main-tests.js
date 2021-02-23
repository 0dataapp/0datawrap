const { throws, rejects, deepEqual } = require('assert');

const mod = require('./main.js');

describe('_ZDRSchemaObjectValidate', function test__ZDRSchemaObjectValidate() {

	const __ZDRSchemaObjectValidate = function (inputData = {}) {
		return mod._ZDRSchemaObjectValidate(uStubSchema(inputData));
	};

	it('throws if not object', function () {
		throws(function () {
			mod._ZDRSchemaObjectValidate(null);
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ZDRSchemaKey not string', function () {
		throws(function () {
			__ZDRSchemaObjectValidate({
				ZDRSchemaKey: null,
			});
		}, /ZDRErrorInputNotString/);
	});

	it('throws if ZDRSchemaKey not filled', function () {
		throws(function () {
			__ZDRSchemaObjectValidate({
				ZDRSchemaKey: ' ',
			});
		}, /ZDRErrorInputNotFilled/);
	});

	it('throws if ZDRSchemaKey not trimmed', function () {
		throws(function () {
			__ZDRSchemaObjectValidate({
				ZDRSchemaKey: ' ' + Math.random().toString() + ' ',
			});
		}, /ZDRErrorInputNotTrimmed/);
	});

	it('throws if ZDRSchemaStub not function', function () {
		throws(function () {
			__ZDRSchemaObjectValidate({
				ZDRSchemaStub: null,
			});
		}, /ZDRErrorInputNotFunction/);
	});

	it('throws if ZDRSchemaPath not function', function () {
		throws(function () {
			__ZDRSchemaObjectValidate({
				ZDRSchemaPath: null,
			});
		}, /ZDRErrorInputNotFunction/);
	});

	it('returns true', function () {
		deepEqual(__ZDRSchemaObjectValidate(), true);
	});

	it('throws if ZDRSchemaMethods not object', function () {
		throws(function () {
			__ZDRSchemaObjectValidate({
				ZDRSchemaMethods: null,
			});
		}, /ZDRErrorInputNotObject/);
	});

	it('throws if ZDRSchemaDispatchValidate not function', function () {
		throws(function () {
			__ZDRSchemaObjectValidate({
				ZDRSchemaDispatchValidate: null,
			});
		}, /ZDRErrorInputNotFunction/);
	});

	it('throws if ZDRSchemaDispatchSyncCreate not function', function () {
		throws(function () {
			__ZDRSchemaObjectValidate({
				ZDRSchemaDispatchSyncCreate: null,
			});
		}, /ZDRErrorInputNotFunction/);
	});

	it('throws if ZDRSchemaDispatchSyncUpdate not function', function () {
		throws(function () {
			__ZDRSchemaObjectValidate({
				ZDRSchemaDispatchSyncUpdate: null,
			});
		}, /ZDRErrorInputNotFunction/);
	});

	it('throws if ZDRSchemaDispatchSyncDelete not function', function () {
		throws(function () {
			__ZDRSchemaObjectValidate({
				ZDRSchemaDispatchSyncDelete: null,
			});
		}, /ZDRErrorInputNotFunction/);
	});

	it('throws if ZDRSchemaDispatchSyncConflict not function', function () {
		throws(function () {
			__ZDRSchemaObjectValidate({
				ZDRSchemaDispatchSyncConflict: null,
			});
		}, /ZDRErrorInputNotFunction/);
	});

});

describe('_ZDRScopeObjectValidate', function test__ZDRScopeObjectValidate() {

	it('throws if not object', function () {
		throws(function () {
			mod._ZDRScopeObjectValidate(null);
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ZDRScopeKey not string', function () {
		throws(function () {
			mod._ZDRScopeObjectValidate(uStubScope({
				ZDRScopeKey: null,
			}));
		}, /ZDRErrorInputNotString/);
	});

	it('throws if ZDRScopeKey not filled', function () {
		throws(function () {
			mod._ZDRScopeObjectValidate(uStubScope({
				ZDRScopeKey: ' ',
			}));
		}, /ZDRErrorInputNotFilled/);
	});

	it('throws if ZDRScopeKey not trimmed', function () {
		throws(function () {
			mod._ZDRScopeObjectValidate(uStubScope({
				ZDRScopeKey: ' ' + Math.random().toString() + ' ',
			}));
		}, /ZDRErrorInputNotTrimmed/);
	});

	it('throws if ZDRScopeDirectory not string', function () {
		throws(function () {
			mod._ZDRScopeObjectValidate(uStubScope({
				ZDRScopeDirectory: null,
			}));
		}, /ZDRErrorInputNotString/);
	});

	it('throws if ZDRScopeDirectory not filled', function () {
		throws(function () {
			mod._ZDRScopeObjectValidate(uStubScope({
				ZDRScopeDirectory: ' ',
			}));
		}, /ZDRErrorInputNotFilled/);
	});

	it('throws if ZDRScopeDirectory not trimmed', function () {
		throws(function () {
			mod._ZDRScopeObjectValidate(uStubScope({
				ZDRScopeDirectory: ' ' + Math.random().toString() + ' ',
			}));
		}, /ZDRErrorInputNotTrimmed/);
	});

	it('returns true', function () {
		deepEqual(mod._ZDRScopeObjectValidate(uStubScope()), true);
	});

	it('throws if ZDRScopeSchemas not array', function () {
		throws(function () {
			mod._ZDRScopeObjectValidate(uStubScope({
				ZDRScopeSchemas: null,
			}));
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ZDRScopeCreatorDirectory not string', function () {
		throws(function () {
			mod._ZDRScopeObjectValidate(uStubScope({
				ZDRScopeCreatorDirectory: null,
			}));
		}, /ZDRErrorInputNotString/);
	});

	it('throws if ZDRScopeCreatorDirectory not filled', function () {
		throws(function () {
			mod._ZDRScopeObjectValidate(uStubScope({
				ZDRScopeCreatorDirectory: ' ',
			}));
		}, /ZDRErrorInputNotFilled/);
	});

	it('throws if ZDRScopeCreatorDirectory not trimmed', function () {
		throws(function () {
			mod._ZDRScopeObjectValidate(uStubScope({
				ZDRScopeCreatorDirectory: ' ' + Math.random().toString() + ' ',
			}));
		}, /ZDRErrorInputNotTrimmed/);
	});

});

describe('_ZDRClientObjectValidate', function test__ZDRClientObjectValidate() {

	it('throws if not object', function () {
		throws(function () {
			mod._ZDRClientObjectValidate(null);
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ZDRClientWriteFile not function', function () {
		throws(function () {
			mod._ZDRClientObjectValidate(uStubCustomClient({
				ZDRClientWriteFile: null,
			}));
		}, /ZDRErrorInputNotFunction/);
	});

	it('throws if ZDRClientReadFile not function', function () {
		throws(function () {
			mod._ZDRClientObjectValidate(uStubCustomClient({
				ZDRClientReadFile: null,
			}));
		}, /ZDRErrorInputNotFunction/);
	});

	it('throws if ZDRClientListObjects not function', function () {
		throws(function () {
			mod._ZDRClientObjectValidate(uStubCustomClient({
				ZDRClientListObjects: null,
			}));
		}, /ZDRErrorInputNotFunction/);
	});

	it('throws if ZDRClientDelete not function', function () {
		throws(function () {
			mod._ZDRClientObjectValidate(uStubCustomClient({
				ZDRClientDelete: null,
			}));
		}, /ZDRErrorInputNotFunction/);
	});

	it('returns true', function () {
		deepEqual(mod._ZDRClientObjectValidate(uStubCustomClient()), true);
	});

	it('throws if ZDRClientPrepare not function', function () {
		throws(function () {
			mod._ZDRClientObjectValidate(uStubCustomClient({
				ZDRClientPrepare: null,
			}));
		}, /ZDRErrorInputNotFunction/);
	});

	it('throws if ZDRClientConnect not function', function () {
		throws(function () {
			mod._ZDRClientObjectValidate(uStubCustomClient({
				ZDRClientConnect: null,
			}));
		}, /ZDRErrorInputNotFunction/);
	});

	it('throws if ZDRClientReconnect not function', function () {
		throws(function () {
			mod._ZDRClientObjectValidate(uStubCustomClient({
				ZDRClientReconnect: null,
			}));
		}, /ZDRErrorInputNotFunction/);
	});

	it('throws if ZDRClientDisconnect not function', function () {
		throws(function () {
			mod._ZDRClientObjectValidate(uStubCustomClient({
				ZDRClientDisconnect: null,
			}));
		}, /ZDRErrorInputNotFunction/);
	});

});

describe('_ZDRPathIsDirectory', function test__ZDRPathIsDirectory() {

	it('throws if not string', function () {
		throws(function () {
			mod._ZDRPathIsDirectory(null);
		}, /ZDRErrorInputNotValid/);
	});

	it('returns true if trailing slash', function () {
		deepEqual(mod._ZDRPathIsDirectory(Math.random().toString() + '/'), true);
	});

	it('returns false', function () {
		deepEqual(mod._ZDRPathIsDirectory(Math.random().toString()), false);
	});

});

describe('_ZDRPathFormatDirectory', function test__ZDRPathFormatDirectory() {

	it('throws if not string', function () {
		throws(function () {
			mod._ZDRPathFormatDirectory(null);
		}, /ZDRErrorInputNotValid/);
	});

	it('returns inputData', function () {
		const item = Math.random().toString();
		deepEqual(mod._ZDRPathFormatDirectory(item + uRandomElement('/', '')), item + '/');
	});

});

describe('_ZDRPathFormatPath', function test__ZDRPathFormatPath() {

	it('throws if not string', function () {
		throws(function () {
			mod._ZDRPathFormatPath(null);
		}, /ZDRErrorInputNotValid/);
	});

	it('returns inputData', function () {
		const item = Math.random().toString();
		deepEqual(mod._ZDRPathFormatPath(uRandomElement('/', '') + item), '/' + item);
	});

});

describe('_ZDRModelSyncCallbackSignatures', function test__ZDRModelSyncCallbackSignatures() {

	it('returns array', function () {
		deepEqual(mod._ZDRModelSyncCallbackSignatures(), [
			'ZDRSchemaDispatchSyncCreate',
			'ZDRSchemaDispatchSyncUpdate',
			'ZDRSchemaDispatchSyncDelete',
			'ZDRSchemaDispatchSyncConflict',
		]);
	});

});

describe('_ZDRModelSyncCallbackInput', function test__ZDRModelSyncCallbackInput() {

	const __ZDRModelSyncCallbackInput = function (param1, param2 = {}) {
		return mod._ZDRModelSyncCallbackInput(param1, Object.assign({
			origin: Math.random().toString(),
		}, param2));
	};

	it('throws if param1 not valid', function () {
		throws(function () {
			__ZDRModelSyncCallbackInput(Math.random().toString());
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			mod._ZDRModelSyncCallbackInput(uRandomElement(mod._ZDRModelSyncCallbackSignatures()), {
				origin: null,
			});
		}, /ZDRErrorInputNotValid/);
	});

	it('returns newValue if ZDRSchemaDispatchSyncCreate', function () {
		const newValue = Math.random().toString();
		deepEqual(__ZDRModelSyncCallbackInput('ZDRSchemaDispatchSyncCreate', {
			newValue,
		}), newValue);
	});

	it('returns newValue if ZDRSchemaDispatchSyncUpdate', function () {
		const newValue = Math.random().toString();
		deepEqual(__ZDRModelSyncCallbackInput('ZDRSchemaDispatchSyncUpdate', {
			newValue,
		}), newValue);
	});

	it('returns oldValue if ZDRSchemaDispatchSyncDelete', function () {
		const oldValue = Math.random().toString();
		deepEqual(__ZDRModelSyncCallbackInput('ZDRSchemaDispatchSyncDelete', {
			oldValue,
		}), oldValue);
	});

	it('returns param2 if conflict', function () {
		const item = {
			origin: Math.random().toString(),
		};
		deepEqual(__ZDRModelSyncCallbackInput('ZDRSchemaDispatchSyncConflict', item), item);
	});

});

describe('ZDRProtocolRemoteStorage', function test_ZDRProtocolRemoteStorage() {

	it('returns array', function () {
		deepEqual(mod.ZDRProtocolRemoteStorage(), 'ZDR_PROTOCOL_REMOTE_STORAGE');
	});

});

describe('ZDRProtocolFission', function test_ZDRProtocolFission() {

	it('returns array', function () {
		deepEqual(mod.ZDRProtocolFission(), 'ZDR_PROTOCOL_FISSION');
	});

});

describe('ZDRProtocolCustom', function test_ZDRProtocolCustom() {

	it('returns array', function () {
		deepEqual(mod.ZDRProtocolCustom(), 'ZDR_PROTOCOL_CUSTOM');
	});

});

describe('_ZDRProtocols', function test__ZDRProtocols() {

	it('returns array', function () {
		deepEqual(mod._ZDRProtocols(), [
			mod.ZDRProtocolRemoteStorage(),
			mod.ZDRProtocolFission(),
			mod.ZDRProtocolCustom(),
		]);
	});

});

describe('ZDRProtocolForIdentity', function test_ZDRProtocolForIdentity() {

	it('throws if not string', function () {
		throws(function () {
			mod.ZDRProtocolForIdentity(null);
		}, /ZDRErrorInputNotValid/);
	});

	it('returns ZDRProtocolRemoteStorage', function () {
		deepEqual(mod.ZDRProtocolForIdentity(Math.random().toString()), mod.ZDRProtocolRemoteStorage());
	});

	it('returns ZDRProtocolFission if match fission.codes', function () {
		deepEqual(mod.ZDRProtocolForIdentity(Math.random().toString() + 'fission.codes' + Math.random().toString()), mod.ZDRProtocolFission());
	});

});

describe('_ZDRProtocol', function test__ZDRProtocol() {

	it('returns type if remoteStorage', function () {
		deepEqual(mod._ZDRProtocol(uStubRemoteStorage()), mod.ZDRProtocolRemoteStorage());
	});

	it('returns type if Fission', function () {
		deepEqual(mod._ZDRProtocol(uStubFission()), mod.ZDRProtocolFission());
	});

	it('returns type if custom', function () {
		deepEqual(mod._ZDRProtocol(uStubCustomClient()), mod.ZDRProtocolCustom());
	});

	it('throws', function () {
		throws(function () {
			mod._ZDRProtocol({});
		}, /ZDRErrorInputNotValid/);
	});

});

describe('_ZDRWrap', function test__ZDRWrap() {

	const __ZDRWrap = function (inputData = {}) {
		return mod._ZDRWrap(Object.assign({
			ZDRParamLibrary: uRandomElement(uStubRemoteStorage(), uStubFission(), uStubCustomClient({
				ZDRClientConnect: (function () {}),
				ZDRClientDisconnect: (function () {}),
			})),
			ZDRParamScopes: [uStubScope(Object.assign({
				ZDRScopeSchemas: [uStubSchema(inputData)],
			}, inputData))],
			ZDRParamDispatchReady: (function () {}),
		}, inputData));
	};

	it('throws if not object', function () {
		throws(function () {
			mod._ZDRWrap(null);
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ZDRParamLibrary not valid', function () {
		throws(function () {
			__ZDRWrap({
				ZDRParamLibrary: null,
			});
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ZDRParamScopes not array', function () {
		throws(function () {
			__ZDRWrap({
				ZDRParamScopes: null,
			});
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ZDRParamScopes not filled', function () {
		throws(function () {
			__ZDRWrap({
				ZDRParamScopes: [],
			});
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ZDRParamScopes element not valid', function () {
		throws(function () {
			__ZDRWrap({
				ZDRParamScopes: [{
					ZDRScopeKey: null,
				}],
			});
		}, /ZDRErrorInputNotString/);
	});

	it('throws if ZDRScopeSchemas element not valid', function () {
		throws(function () {
			__ZDRWrap({
				ZDRParamScopes: [{
					ZDRScopeKey: Math.random().toString(),
					ZDRScopeDirectory: Math.random().toString(),
					ZDRScopeSchemas: [{
						ZDRSchemaKey: null
					}]
				}],
			});
		}, /ZDRErrorInputNotString/);
	});

	it('throws if ZDRParamDispatchReady not function', function () {
		throws(function () {
			__ZDRWrap({
				ZDRParamDispatchReady: null,
			});
		}, /ZDRErrorInputNotValid/);
	});

	it('returns object', function () {
		deepEqual(typeof __ZDRWrap(), 'object');
	});

	it('throws if ZDRParamDispatchError not function', function () {
		throws(function () {
			__ZDRWrap({
				ZDRParamDispatchError: null,
			});
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ZDRParamDispatchConnected not function', function () {
		throws(function () {
			__ZDRWrap({
				ZDRParamDispatchConnected: null,
			});
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ZDRParamDispatchOnline not function', function () {
		throws(function () {
			__ZDRWrap({
				ZDRParamDispatchOnline: null,
			});
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ZDRParamDispatchOffline not function', function () {
		throws(function () {
			__ZDRWrap({
				ZDRParamDispatchOffline: null,
			});
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ZDRParamDispatchSyncDidStart not function', function () {
		throws(function () {
			__ZDRWrap({
				ZDRParamDispatchSyncDidStart: null,
			});
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ZDRParamDispatchSyncDidStop not function', function () {
		throws(function () {
			__ZDRWrap({
				ZDRParamDispatchSyncDidStop: null,
			});
		}, /ZDRErrorInputNotValid/);
	});

	const __ZDRStorage = function (inputData = {}) {
		const ZDRScopeKey = Math.random().toString();

		return __ZDRWrap(Object.assign({
			ZDRScopeKey,
		}, inputData))[ZDRScopeKey];
	};

	context('ZDRStorageWriteObject', function test_ZDRStorageWriteObject() {

		it('throws if param1 not string', function () {
			throws(function () {
				__ZDRStorage().ZDRStorageWriteObject(null, {});
			}, /ZDRErrorInputNotValid/);
		});

		it('throws if param2 not object', function () {
			throws(function () {
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

	context('ZDRStorageWriteFile', function test_ZDRStorageWriteFile() {

		const param3 = Date.now().toString() + '/' + Date.now().toString();

		it('throws if param1 not string', function () {
			throws(function () {
				__ZDRStorage().ZDRStorageWriteFile(null, {}, param3);
			}, /ZDRErrorInputNotValid/);
		});

		it('throws if param3 not string', function () {
			throws(function () {
				__ZDRStorage().ZDRStorageWriteFile(Math.random().toString(), {}, null);
			}, /ZDRErrorInputNotValid/);
		});

		it('returns param2', async function () {
			const item = Math.random().toString();
			deepEqual(await __ZDRStorage().ZDRStorageWriteFile(Math.random().toString(), item, param3), item);
		});

	});

	context('ZDRStorageReadObject', function test_ZDRStorageReadObject() {

		it('throws if not string', function () {
			throws(function () {
				__ZDRStorage().ZDRStorageReadObject(null);
			}, /ZDRErrorInputNotValid/);
		});

		it('returns null', async function () {
			deepEqual(await __ZDRStorage().ZDRStorageReadObject(Math.random().toString()), null);
		});

	});

	context('ZDRStorageReadFile', function test_ZDRStorageReadFile() {

		it('throws if not string', function () {
			throws(function () {
				__ZDRStorage().ZDRStorageReadFile(null);
			}, /ZDRErrorInputNotValid/);
		});

		it('returns null', function () {
			deepEqual(__ZDRStorage().ZDRStorageReadFile(Math.random().toString()), null);
		});

	});

	context('ZDRStorageListObjects', function test_ZDRStorageListObjects() {

		it('throws if not string', function () {
			throws(function () {
				__ZDRStorage().ZDRStorageListObjects(null);
			}, /ZDRErrorInputNotValid/);
		});

		it('returns object', async function () {
			deepEqual(await __ZDRStorage().ZDRStorageListObjects(Math.random().toString()), {});
		});

	});

	context('ZDRStoragePaths', function test_ZDRStoragePaths() {

		it('throws if not string', function () {
			throws(function () {
				__ZDRStorage().ZDRStoragePaths(null);
			}, /ZDRErrorInputNotValid/);
		});

		it('calls _ZDRStoragePaths', function () {
			const item = Math.random().toString();
			deepEqual(Object.assign(__ZDRStorage(), {
				_ZDRStoragePaths: (function () {
					return [...arguments];
				}),
			}).ZDRStoragePaths(item + uRandomElement('/', '')), [mod._ZDRPathFormatDirectory(item)])
		});

		it('returns array', async function () {
			deepEqual(await __ZDRStorage().ZDRStoragePaths(Math.random().toString()), []);
		});

	});

	context('_ZDRStoragePathsRecursive', function test__ZDRStoragePathsRecursive() {

		it('calls ZDRStoragePaths', async function () {
			const item = mod._ZDRPathFormatDirectory(Math.random().toString());
			const file = Math.random().toString();
			deepEqual(await Object.assign(__ZDRStorage(), {
				ZDRStoragePaths: (function () {
					return [file];
				}),
			})._ZDRStoragePathsRecursive(item), [mod._ZDRPathFormatDirectory(item) + file]);
		});

		it('calls ZDRStoragePaths recursively', async function () {
			const item = mod._ZDRPathFormatDirectory(Math.random().toString());
			const folder = mod._ZDRPathFormatDirectory(Math.random().toString());
			const file = Math.random().toString();
			deepEqual(await Object.assign(__ZDRStorage(), {
				ZDRStoragePaths: (function (inputData) {
					return [inputData === item ? folder : file];
				}),
			})._ZDRStoragePathsRecursive(item), [mod._ZDRPathFormatDirectory(item) + folder + file]);
		});

	});

	context('ZDRStoragePathsRecursive', function test_ZDRStoragePathsRecursive() {

		it('throws if not string', function () {
			throws(function () {
				__ZDRStorage().ZDRStoragePathsRecursive(null);
			}, /ZDRErrorInputNotValid/);
		});

		it('calls _ZDRStoragePathsRecursive', function () {
			const item = Math.random().toString();
			deepEqual(Object.assign(__ZDRStorage(), {
				_ZDRStoragePathsRecursive: (function () {
					return [...arguments];
				}),
			}).ZDRStoragePathsRecursive(item), [mod._ZDRPathFormatDirectory(item)])
		});

		it('returns array', async function () {
			deepEqual(await __ZDRStorage().ZDRStoragePathsRecursive(Math.random().toString()), []);
		});

	});

	context('ZDRStorageDelete', function test_ZDRStorageDelete() {

		it('throws if not string', function () {
			throws(function () {
				__ZDRStorage().ZDRStorageDelete(null);
			}, /ZDRErrorInputNotValid/);
		});

		it('returns null', function () {
			deepEqual(__ZDRStorage().ZDRStorageDelete(Math.random().toString()), null);
		});

	});

	context('ZDRStorageProtocol', function test_ZDRStorageProtocol() {

		it('returns ZDRProtocol', function () {
			const ZDRParamLibrary = uRandomElement(uStubRemoteStorage(), uStubFission());
			deepEqual(__ZDRWrap({
				ZDRParamLibrary,
			}).ZDRStorageProtocol, mod._ZDRProtocol(ZDRParamLibrary));
		});

	});

	context('ZDRStorageClient', function test_ZDRStorageClient() {

		it('exposes client for remoteStorage', function () {
			const ZDRScopeDirectory = Math.random().toString();
			deepEqual(Object.keys(__ZDRWrap({
				ZDRParamScopes: [uStubScope({
					ZDRScopeDirectory,
				})],
				ZDRParamLibrary: uStubRemoteStorage(),
			}).ZDRStorageClient()[ZDRScopeDirectory]), ['privateClient', 'publicClient']);
		});

		it('exposes client for Fission', function () {
			deepEqual(typeof __ZDRWrap({
				ZDRParamLibrary: uStubFission(),
			}).ZDRStorageClient().write, 'function');
		});

	});

	context('ZDRModel', function () {

		const _ZDRModel = function (inputData = {}) {
			const ZDRSchemaKey = Math.random().toString();

			return Object.assign(Object.assign(__ZDRStorage(Object.assign({
				ZDRSchemaKey,
			}, inputData)), inputData)[ZDRSchemaKey], inputData);
		};

		context('ZDRModelPath', function test_ZDRModelPath() {

			it('throws if not object', function () {
				throws(function () {
					_ZDRModel().ZDRModelPath(null);
				}, /ZDRErrorInputNotValid/);
			});

			it('calls ZDRSchemaPath', async function () {
				const inputData = {
					[Math.random().toString()]: Math.random().toString(),
				};

				deepEqual(_ZDRModel({
					ZDRSchemaPath: (function () {
						return JSON.stringify([...arguments]);
					}),
				}).ZDRModelPath(inputData), JSON.stringify([inputData]));
			});

			it('returns result', async function () {
				const item = Math.random().toString();
				deepEqual(_ZDRModel({
					ZDRSchemaPath: (function () {
						return item;
					}),
				}).ZDRModelPath({}), item);
			});

		});

		context('ZDRModelWriteObject', function test_ZDRModelWriteObject() {

			it('throws if not object', function () {
				throws(function () {
					_ZDRModel().ZDRModelWriteObject(null);
				}, /ZDRErrorInputNotValid/);
			});

			it('rejects if ZDRSchemaDispatchValidate truthy', async function () {
				const item = Math.random().toString();
				await rejects(_ZDRModel({
					ZDRSchemaDispatchValidate: (function () {
						return [item];
					}),
				}).ZDRModelWriteObject({}), [item]);
			});

			it('calls ZDRStorageWriteObject', async function () {
				const inputData = {
					[Math.random().toString()]: Math.random().toString(),
				};
				const path = Math.random().toString();

				const model = _ZDRModel({
					ZDRStorageWriteObject: (function () {
						return [...arguments];
					}),
					ZDRSchemaPath: (function () {
						return path;
					}),
				});

				deepEqual(model.ZDRModelWriteObject(inputData), [path, inputData]);
			});

			it('returns inputData', async function () {
				const item = {
					[Math.random().toString()]: Math.random().toString(),
				};
				deepEqual(await _ZDRModel().ZDRModelWriteObject(item), item);
			});

		});

		context('_ZDRModelListObjects', function test__ZDRModelListObjects() {

			it('calls ZDRStoragePathsRecursive', function () {
				const item = [];

				const model = _ZDRModel({
					ZDRStoragePathsRecursive: (function () {
						item.push(...arguments);

						return [];
					}),
				})._ZDRModelListObjects();

				deepEqual(item, ['/']);
			});

			it('excludes if no match', async function () {
				const item = Math.random().toString();
				deepEqual(await _ZDRModel({
					ZDRStoragePathsRecursive: (function () {
						return [item];
					}),
					ZDRSchemaStub: (function () {
						return Object.fromEntries([item.split('.')]);
					}),
					ZDRSchemaPath: (function () {
						return Math.random().toString();
					}),
				})._ZDRModelListObjects(), []);
			});

			it('include if match', async function () {
				const item = Math.random().toString();
				deepEqual(await _ZDRModel({
					ZDRStoragePathsRecursive: (function () {
						return [item];
					}),
					ZDRSchemaStub: (function () {
						return Object.fromEntries([item.split('.')]);
					}),
					ZDRSchemaPath: (function (inputData) {
						return Object.entries(inputData).shift().join('.');
					}),
				})._ZDRModelListObjects(), [item]);
			});

			it('include if match leading slash insensitive', async function () {
				const slash = uRandomElement(true, false);
				const item = Math.random().toString();
				deepEqual(await _ZDRModel({
					ZDRStoragePathsRecursive: (function () {
						return [slash ? mod._ZDRPathFormatPath(item) : item];
					}),
					ZDRSchemaStub: (function () {
						return Object.fromEntries([item.split('.')]);
					}),
					ZDRSchemaPath: (function (inputData) {
						const item = Object.entries(inputData).shift().join('.');
						return !slash ? mod._ZDRPathFormatPath(item) : item;
					}),
				})._ZDRModelListObjects(), [slash ? mod._ZDRPathFormatPath(item) : item]);
			});

		});

		context('ZDRModelListObjects', function test_ZDRModelListObjects() {

			it('calls _ZDRModelListObjects', function () {
				const item = [];

				const model = _ZDRModel({
					_ZDRModelListObjects: (function () {
						item.push([...arguments]);

						return [];
					}),
				}).ZDRModelListObjects();

				deepEqual(item, [
					[]
				]);
			});

			it('maps ZDRStorageReadObject', async function () {
				const item = Math.random().toString();
				deepEqual(await _ZDRModel({
					_ZDRModelListObjects: (function () {
						return [item];
					}),
					ZDRStorageReadObject: (function (inputData) {
						return inputData.split('.');
					}),
				}).ZDRModelListObjects(), [item.split('.')]);
			});

		});

		context('ZDRModelDeleteObject', function test_ZDRModelDeleteObject() {

			it('throws if not object', function () {
				throws(function () {
					_ZDRModel().ZDRModelDeleteObject(null);
				}, /ZDRErrorInputNotValid/);
			});

			it('calls ZDRStorageDelete', async function () {
				const inputData = {
					[Math.random().toString()]: Math.random().toString(),
				};
				const path = Math.random().toString();

				const model = _ZDRModel({
					ZDRStorageDelete: (function () {
						return [...arguments];
					}),
					ZDRSchemaPath: (function () {
						return path;
					}),
				});

				deepEqual(model.ZDRModelDeleteObject(inputData), [path]);
			});

			it('returns inputData', async function () {
				const item = {
					[Math.random().toString()]: Math.random().toString(),
				};
				deepEqual(await _ZDRModel().ZDRModelWriteObject(item), item);
			});

		});

		context('ZDRSchemaMethods', function test_ZDRSchemaMethods() {

			it('throws if not function', function () {
				throws(function () {
					__ZDRWrap(Object.assign({
						ZDRSchemaMethods: {
							[Math.random().toString()]: Math.random().toString(),
						},
					}));
				}, /ZDRErrorInputNotFunction/);
			});

			it('binds wrap to this', function () {
				const ZDRScopeKey = Math.random().toString();
				const ZDRSchemaKey = Math.random().toString();
				const item = Math.random().toString();

				const wrap = __ZDRWrap(Object.assign({
					ZDRScopeKey,
					ZDRSchemaKey,
					ZDRSchemaMethods: {
						[item]: (function () {
							return [this].concat(...arguments);
						}),
					},
				}));

				deepEqual(wrap[ZDRScopeKey][ZDRSchemaKey][item](item), [wrap, item]);
			});

		});

	});

	context('ZDRCloudConnect', function test_ZDRCloudConnect() {

		it('throws if not string', function () {
			throws(function () {
				__ZDRWrap().ZDRCloudConnect(null);
			}, /ZDRErrorInputNotValid/);
		});

		it('returns undefined', function () {
			deepEqual(__ZDRWrap().ZDRCloudConnect(Math.random().toString()), undefined);
		});

	});

	context('ZDRCloudReconnect', function test_ZDRCloudReconnect() {

		it('returns undefined', function () {
			deepEqual(__ZDRWrap().ZDRCloudReconnect(), undefined);
		});

	});

	context('ZDRCloudDisconnect', function test_ZDRCloudDisconnect() {

		it('returns undefined', function () {
			deepEqual(__ZDRWrap().ZDRCloudDisconnect(), undefined);
		});

	});

});

describe('ZDRWrap', function test_ZDRWrap() {

	it('calls _ZDRWrap', function () {
		const item = {
			[Math.random().toString()]: Math.random().toString(),
		};
		deepEqual(uCapture(function (capture) {
			Object.assign(Object.assign({}, mod), {
				_ZDRWrap: (function () {
					capture(...arguments);
				}),
			}).ZDRWrap(item);
		}), [item]);
	});

	it('sets ZDRParamDispatchReady', async function () {
		const ZDRScopeKey = Math.random().toString();
		const ZDRParamLibrary = uRandomElement(uStubRemoteStorage(), uStubFission({
			initialize: (function () {
				return {
					scenario: 'AuthSucceeded',
				};
			}),
		}), uStubCustomClient());

		deepEqual((await mod.ZDRWrap({
			ZDRParamLibrary,
			ZDRParamScopes: [uStubScope({
				ZDRScopeKey
			})],
		})).hasOwnProperty(ZDRScopeKey), true);
	});

});

describe('ZDRPreferenceProtocol', function test_ZDRPreferenceProtocol() {

	it('throws if not valid', function () {
		throws(function () {
			mod.ZDRPreferenceProtocol(Math.random().toString());
		}, /ZDRErrorInputNotValid/);
	});

	it('calls localStorage.getItem', function () {
		deepEqual(uCapture(function (capture) {
			mod.ZDRPreferenceProtocol(uRandomElement(mod._ZDRProtocols()), uStubLocalStorage({
				getItem: (function () {
					capture(...arguments);
				}),
			}));
		}), [
			'ZDR_PREFERENCE_PROTOCOL',
			'ZDR_PREFERENCE_PROTOCOL',
		]);
	});

	it('calls localStorage.setItem if localStorage.getItem falsey', function () {
		const item = uRandomElement(Math.random().toString(), false);
		deepEqual(uCapture(function (capture) {
			mod.ZDRPreferenceProtocol(uRandomElement(mod._ZDRProtocols()), uStubLocalStorage({
				getItem: (function () {
					return item;
				}),
				setItem: (function () {
					capture(item);
				}),
			}));
		}), item ? [] : [item]);
	});

	it('returns localStorage.getItem', function () {
		const item = Math.random().toString();
		deepEqual(mod.ZDRPreferenceProtocol(uRandomElement(mod._ZDRProtocols()), uStubLocalStorage({
			getItem: (function () {
				return item;
			}),
		})), item);
	});

});

describe('ZDRPreferenceProtocolClear', function test_ZDRPreferenceProtocolClear() {

	it('calls localStorage.removeItem', function () {
		deepEqual(uCapture(function (capture) {
			mod.ZDRPreferenceProtocolClear(uStubLocalStorage({
				removeItem: (function () {
					capture(...arguments);
				}),
			}));
		}), [
			'ZDR_PREFERENCE_PROTOCOL',
		]);
	});

	it('returns localStorage.removeItem', function () {
		const item = Math.random().toString();
		deepEqual(mod.ZDRPreferenceProtocolClear(uStubLocalStorage({
			removeItem: (function () {
				return item;
			}),
		})), item);
	});

});

describe('ZDRPreferenceProtocolMigrate', function test_ZDRPreferenceProtocolMigrate() {

	it('calls localStorage.getItem', function () {
		deepEqual(uCapture(function (capture) {
			mod.ZDRPreferenceProtocolMigrate(uStubLocalStorage({
				getItem: (function () {
					capture(...arguments);
				}),
			}));
		}), [
			'ZDR_PREFERENCE_PROTOCOL_MIGRATE',
		]);
	});

	it('returns localStorage.getItem', function () {
		const item = Math.random().toString();
		deepEqual(mod.ZDRPreferenceProtocolMigrate(uStubLocalStorage({
			getItem: (function () {
				return item;
			}),
		})), item);
	});

});

describe('ZDRPreferenceProtocolMigrateClear', function test_ZDRPreferenceProtocolMigrateClear() {

	it('calls localStorage.removeItem', function () {
		deepEqual(uCapture(function (capture) {
			mod.ZDRPreferenceProtocolMigrateClear(uStubLocalStorage({
				removeItem: (function () {
					capture(...arguments);
				}),
			}));
		}), [
			'ZDR_PREFERENCE_PROTOCOL_MIGRATE',
		]);
	});

	it('returns localStorage.removeItem', function () {
		const item = Math.random().toString();
		deepEqual(mod.ZDRPreferenceProtocolMigrateClear(uStubLocalStorage({
			removeItem: (function () {
				return item;
			}),
		})), item);
	});

});

describe('ZDRPreferenceProtocolConnect', function test_ZDRPreferenceProtocolConnect() {

	it('throws if not string', function () {
		throws(function () {
			mod.ZDRPreferenceProtocolConnect(null);
		}, /ZDRErrorInputNotValid/);
	});

	it('calls ZDRProtocolForIdentity', function () {
		const item = Math.random().toString();
		deepEqual(uCapture(function (capture) {
			Object.assign(Object.assign({}, mod), {
				ZDRProtocolForIdentity: (function () {
					capture(...arguments);

					return uRandomElement(mod._ZDRProtocols());
				}),
			}).ZDRPreferenceProtocolConnect(item, uStubLocalStorage());
		}), [item]);
	});

	it('sets ZDR_PREFERENCE_PROTOCOL_MIGRATE if different', function () {
		const item = uRandomElement(true, false);
		deepEqual(uCapture(function (capture) {
			mod.ZDRPreferenceProtocolConnect(item ? Math.random().toString() : 'fission.codes', uStubLocalStorage({
				getItem: (function () {
					return mod.ZDRProtocolRemoteStorage();
				}),
				setItem: (function () {
					capture(...arguments);
				}),
			}));
		}), item ? [
			'ZDR_PREFERENCE_PROTOCOL',
			mod.ZDRProtocolRemoteStorage(),
		] : [
			'ZDR_PREFERENCE_PROTOCOL_MIGRATE',
			mod.ZDRProtocolRemoteStorage(),
			'ZDR_PREFERENCE_PROTOCOL',
			mod.ZDRProtocolFission(),
		]);
	});

	it('returns ZDRProtocol', function () {
		const item = uRandomElement(true, false);
		deepEqual(mod.ZDRPreferenceProtocolConnect(item ? Math.random().toString() : 'fission.codes', uStubLocalStorage()), item ? mod.ZDRProtocolRemoteStorage() : mod.ZDRProtocolFission());
	});

});

describe('ZDRLauncherFakeItemProxy', function test_ZDRLauncherFakeItemProxy() {

	it('returns object', function () {
		const item = mod.ZDRLauncherFakeItemProxy();
		deepEqual(item, {
			LCHRecipeName: 'ZDRLauncherFakeItemProxy',
			LCHRecipeCallback: item.LCHRecipeCallback,
		});
	});

	context('LCHRecipeCallback', function () {
		
		it('returns undefined', function () {
			deepEqual(mod.ZDRLauncherFakeItemProxy().LCHRecipeCallback(), undefined);
		});

	});

});

describe('ZDRLauncherItemFakeDispatchError', function test_ZDRLauncherItemFakeDispatchError() {

	it('throws if not object', function () {
		throws(function () {
			mod.ZDRLauncherItemFakeDispatchError(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = mod.ZDRLauncherItemFakeDispatchError({});
		deepEqual(item, {
			LCHRecipeName: 'ZDRLauncherItemFakeDispatchError',
			LCHRecipeCallback: item.LCHRecipeCallback,
		});
	});

	context('LCHRecipeCallback', function () {

		it('calls ZDRParamDispatchError', function () {
			deepEqual(mod.ZDRLauncherItemFakeDispatchError({
				ZDRParamDispatchError: (function () {
					return [...arguments];
				}),
			}).LCHRecipeCallback(), [new Error('ZDR_FAKE_CLOUD_ERROR')]);
		});
		
	});

});

describe('ZDRLauncherItemFakeDispatchConnected', function test_ZDRLauncherItemFakeDispatchConnected() {

	it('throws if not object', function () {
		throws(function () {
			mod.ZDRLauncherItemFakeDispatchConnected(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = mod.ZDRLauncherItemFakeDispatchConnected({});
		deepEqual(item, {
			LCHRecipeName: 'ZDRLauncherItemFakeDispatchConnected',
			LCHRecipeCallback: item.LCHRecipeCallback,
		});
	});

	context('LCHRecipeCallback', function () {

		it('calls ZDRParamDispatchConnected', function () {
			deepEqual(mod.ZDRLauncherItemFakeDispatchConnected({
				ZDRParamDispatchConnected: (function () {
					return [...arguments];
				}),
			}).LCHRecipeCallback(), ['ZDR_FAKE_CLOUD_IDENTITY']);
		});
		
	});

});

describe('ZDRLauncherItemFakeDispatchOnline', function test_ZDRLauncherItemFakeDispatchOnline() {

	it('throws if not object', function () {
		throws(function () {
			mod.ZDRLauncherItemFakeDispatchOnline(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = mod.ZDRLauncherItemFakeDispatchOnline({});
		deepEqual(item, {
			LCHRecipeName: 'ZDRLauncherItemFakeDispatchOnline',
			LCHRecipeCallback: item.LCHRecipeCallback,
		});
	});

	context('LCHRecipeCallback', function () {

		it('calls ZDRParamDispatchOnline', function () {
			const item = Math.random().toString();
			deepEqual(mod.ZDRLauncherItemFakeDispatchOnline({
				ZDRParamDispatchOnline: (function () {
					return item;
				}),
			}).LCHRecipeCallback(), item);
		});
		
	});

});

describe('ZDRLauncherItemFakeDispatchOffline', function test_ZDRLauncherItemFakeDispatchOffline() {

	it('throws if not object', function () {
		throws(function () {
			mod.ZDRLauncherItemFakeDispatchOffline(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = mod.ZDRLauncherItemFakeDispatchOffline({});
		deepEqual(item, {
			LCHRecipeName: 'ZDRLauncherItemFakeDispatchOffline',
			LCHRecipeCallback: item.LCHRecipeCallback,
		});
	});

	context('LCHRecipeCallback', function () {

		it('calls ZDRParamDispatchOffline', function () {
			const item = Math.random().toString();
			deepEqual(mod.ZDRLauncherItemFakeDispatchOffline({
				ZDRParamDispatchOffline: (function () {
					return item;
				}),
			}).LCHRecipeCallback(), item);
		});
		
	});

});

describe('ZDRLauncherItemFakeDispatchSyncDidStart', function test_ZDRLauncherItemFakeDispatchSyncDidStart() {

	it('throws if not object', function () {
		throws(function () {
			mod.ZDRLauncherItemFakeDispatchSyncDidStart(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = mod.ZDRLauncherItemFakeDispatchSyncDidStart({});
		deepEqual(item, {
			LCHRecipeName: 'ZDRLauncherItemFakeDispatchSyncDidStart',
			LCHRecipeCallback: item.LCHRecipeCallback,
		});
	});

	context('LCHRecipeCallback', function () {

		it('calls ZDRParamDispatchSyncDidStart', function () {
			const item = Math.random().toString();
			deepEqual(mod.ZDRLauncherItemFakeDispatchSyncDidStart({
				ZDRParamDispatchSyncDidStart: (function () {
					return item;
				}),
			}).LCHRecipeCallback(), item);
		});
		
	});

});

describe('ZDRLauncherItemFakeDispatchSyncDidStop', function test_ZDRLauncherItemFakeDispatchSyncDidStop() {

	it('throws if not object', function () {
		throws(function () {
			mod.ZDRLauncherItemFakeDispatchSyncDidStop(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = mod.ZDRLauncherItemFakeDispatchSyncDidStop({});
		deepEqual(item, {
			LCHRecipeName: 'ZDRLauncherItemFakeDispatchSyncDidStop',
			LCHRecipeCallback: item.LCHRecipeCallback,
		});
	});

	context('LCHRecipeCallback', function () {

		it('calls ZDRParamDispatchSyncDidStop', function () {
			const item = Math.random().toString();
			deepEqual(mod.ZDRLauncherItemFakeDispatchSyncDidStop({
				ZDRParamDispatchSyncDidStop: (function () {
					return item;
				}),
			}).LCHRecipeCallback(), item);
		});
		
	});

});

describe('ZDRLauncherItemFakeDispatchDisconnected', function test_ZDRLauncherItemFakeDispatchDisconnected() {

	it('throws if not object', function () {
		throws(function () {
			mod.ZDRLauncherItemFakeDispatchDisconnected(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = mod.ZDRLauncherItemFakeDispatchDisconnected({});
		deepEqual(item, {
			LCHRecipeName: 'ZDRLauncherItemFakeDispatchDisconnected',
			LCHRecipeCallback: item.LCHRecipeCallback,
		});
	});

	context('LCHRecipeCallback', function () {

		it('calls ZDRParamDispatchConnected', function () {
			deepEqual(mod.ZDRLauncherItemFakeDispatchDisconnected({
				ZDRParamDispatchConnected: (function () {
					return [...arguments];
				}),
			}).LCHRecipeCallback().pop(), null);
		});
		
	});

});

describe('ZDRRecipes', function test_ZDRRecipes() {

	const _ZDRRecipes = function (inputData = {}) {
		return mod.ZDRRecipes(Object.assign({
			ParamMod: {},
			ParamSpecUI: false,
		}, inputData));
	};

	it('throws if not object', function () {
		throws(function () {
			mod.ZDRRecipes(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamMod not object', function () {
		throws(function () {
			_ZDRRecipes({
				ParamMod: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamSpecUI not boolean', function () {
		throws(function () {
			_ZDRRecipes({
				ParamSpecUI: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('includes production recipes', function () {
		deepEqual(_ZDRRecipes().map(function (e) {
			return e.LCHRecipeSignature || e.LCHRecipeName;
		}), Object.keys(mod).filter(function (e) {
			return e.match(/Launcher/) && !e.match(/Fake/);
		}));
	});

	context('ParamSpecUI', function () {

		it('includes all recipes', function () {
			deepEqual(_ZDRRecipes({
				ParamSpecUI: true,
			}).map(function (e) {
				return e.LCHRecipeSignature || e.LCHRecipeName;
			}), Object.keys(mod).filter(function (e) {
				return e.match(/Launcher/);
			}));
		});
	
	});

});
