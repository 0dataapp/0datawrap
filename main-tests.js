const { throws, rejects, deepEqual } = require('assert');

const mod = require('./main.js');

describe('_ZDRSchemaObjectValidate', function test__ZDRSchemaObjectValidate () {

	const __ZDRSchemaObjectValidate = function (inputData = {}) {
		return mod._ZDRSchemaObjectValidate(uStubSchema(inputData));
	};

	it('throws if not object', function() {
		throws(function() {
			mod._ZDRSchemaObjectValidate(null);
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ZDRSchemaKey not string', function() {
		throws(function() {
			__ZDRSchemaObjectValidate({
				ZDRSchemaKey: null,
			});
		}, /ZDRErrorInputNotString/);
	});

	it('throws if ZDRSchemaKey not filled', function() {
		throws(function() {
			__ZDRSchemaObjectValidate({
				ZDRSchemaKey: ' ',
			});
		}, /ZDRErrorInputNotFilled/);
	});

	it('throws if ZDRSchemaKey not trimmed', function() {
		throws(function() {
			__ZDRSchemaObjectValidate({
				ZDRSchemaKey: ' ' + Math.random().toString() + ' ',
			});
		}, /ZDRErrorInputNotTrimmed/);
	});

	it('throws if ZDRSchemaStubCallback not function', function() {
		throws(function() {
			__ZDRSchemaObjectValidate({
				ZDRSchemaStubCallback: null,
			});
		}, /ZDRErrorInputNotFunction/);
	});

	it('throws if ZDRSchemaPathCallback not function', function() {
		throws(function() {
			__ZDRSchemaObjectValidate({
				ZDRSchemaPathCallback: null,
			});
		}, /ZDRErrorInputNotFunction/);
	});

	it('returns true', function () {
		deepEqual(__ZDRSchemaObjectValidate(), true);
	});

	it('throws if ZDRSchemaMethods not object', function() {
		throws(function() {
			__ZDRSchemaObjectValidate({
				ZDRSchemaMethods: null,
			});
		}, /ZDRErrorInputNotObject/);
	});

	it('throws if ZDRSchemaValidationCallback not function', function() {
		throws(function() {
			__ZDRSchemaObjectValidate({
				ZDRSchemaValidationCallback: null,
			});
		}, /ZDRErrorInputNotFunction/);
	});

	it('throws if ZDRSchemaSyncCallbackCreate not function', function() {
		throws(function() {
			__ZDRSchemaObjectValidate({
				ZDRSchemaSyncCallbackCreate: null,
			});
		}, /ZDRErrorInputNotFunction/);
	});

	it('throws if ZDRSchemaSyncCallbackUpdate not function', function() {
		throws(function() {
			__ZDRSchemaObjectValidate({
				ZDRSchemaSyncCallbackUpdate: null,
			});
		}, /ZDRErrorInputNotFunction/);
	});

	it('throws if ZDRSchemaSyncCallbackDelete not function', function() {
		throws(function() {
			__ZDRSchemaObjectValidate({
				ZDRSchemaSyncCallbackDelete: null,
			});
		}, /ZDRErrorInputNotFunction/);
	});

	it('throws if ZDRSchemaSyncCallbackConflict not function', function() {
		throws(function() {
			__ZDRSchemaObjectValidate({
				ZDRSchemaSyncCallbackConflict: null,
			});
		}, /ZDRErrorInputNotFunction/);
	});

});

describe('_ZDRScopeObjectValidate', function test__ZDRScopeObjectValidate () {

	it('throws if not object', function() {
		throws(function() {
			mod._ZDRScopeObjectValidate(null);
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ZDRScopeKey not string', function() {
		throws(function() {
			mod._ZDRScopeObjectValidate(uStubScope({
				ZDRScopeKey: null,
			}));
		}, /ZDRErrorInputNotString/);
	});

	it('throws if ZDRScopeKey not filled', function() {
		throws(function() {
			mod._ZDRScopeObjectValidate(uStubScope({
				ZDRScopeKey: ' ',
			}));
		}, /ZDRErrorInputNotFilled/);
	});

	it('throws if ZDRScopeKey not trimmed', function() {
		throws(function() {
			mod._ZDRScopeObjectValidate(uStubScope({
				ZDRScopeKey: ' ' + Math.random().toString() + ' ',
			}));
		}, /ZDRErrorInputNotTrimmed/);
	});

	it('throws if ZDRScopeDirectory not string', function() {
		throws(function() {
			mod._ZDRScopeObjectValidate(uStubScope({
				ZDRScopeDirectory: null,
			}));
		}, /ZDRErrorInputNotString/);
	});

	it('throws if ZDRScopeDirectory not filled', function() {
		throws(function() {
			mod._ZDRScopeObjectValidate(uStubScope({
				ZDRScopeDirectory: ' ',
			}));
		}, /ZDRErrorInputNotFilled/);
	});

	it('throws if ZDRScopeDirectory not trimmed', function() {
		throws(function() {
			mod._ZDRScopeObjectValidate(uStubScope({
				ZDRScopeDirectory: ' ' + Math.random().toString() + ' ',
			}));
		}, /ZDRErrorInputNotTrimmed/);
	});

	it('returns true', function () {
		deepEqual(mod._ZDRScopeObjectValidate(uStubScope()), true);
	});

	it('throws if ZDRScopeSchemas not array', function() {
		throws(function() {
			mod._ZDRScopeObjectValidate(uStubScope({
				ZDRScopeSchemas: null,
			}));
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ZDRScopeCreatorDirectory not string', function() {
		throws(function() {
			mod._ZDRScopeObjectValidate(uStubScope({
				ZDRScopeCreatorDirectory: null,
			}));
		}, /ZDRErrorInputNotString/);
	});

	it('throws if ZDRScopeCreatorDirectory not filled', function() {
		throws(function() {
			mod._ZDRScopeObjectValidate(uStubScope({
				ZDRScopeCreatorDirectory: ' ',
			}));
		}, /ZDRErrorInputNotFilled/);
	});

	it('throws if ZDRScopeCreatorDirectory not trimmed', function() {
		throws(function() {
			mod._ZDRScopeObjectValidate(uStubScope({
				ZDRScopeCreatorDirectory: ' ' + Math.random().toString() + ' ',
			}));
		}, /ZDRErrorInputNotTrimmed/);
	});

});

describe('_ZDRPathIsDirectory', function test__ZDRPathIsDirectory () {

	it('throws if not string', function() {
		throws(function() {
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

describe('_ZDRModelSyncCallbackSignatures', function test__ZDRModelSyncCallbackSignatures() {

	it('returns array', function() {
		deepEqual(mod._ZDRModelSyncCallbackSignatures(), [
			'ZDRSchemaSyncCallbackCreate',
			'ZDRSchemaSyncCallbackUpdate',
			'ZDRSchemaSyncCallbackDelete',
			'ZDRSchemaSyncCallbackConflict',
		]);
	});

});

describe('_ZDRModelSyncCallbackInput', function test__ZDRModelSyncCallbackInput() {

	const __ZDRModelSyncCallbackInput = function (param1, param2 = {}) {
		return mod._ZDRModelSyncCallbackInput(param1, Object.assign({
			origin: Math.random().toString(),
		}, param2));
	};

	it('throws if param1 not valid', function() {
		throws(function () {
			__ZDRModelSyncCallbackInput(Math.random().toString());
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if param2 not valid', function() {
		throws(function () {
			mod._ZDRModelSyncCallbackInput(uRandomElement(mod._ZDRModelSyncCallbackSignatures()), {
				origin: null,
			});
		}, /ZDRErrorInputNotValid/);
	});

	it('returns newValue if ZDRSchemaSyncCallbackCreate', function() {
		const newValue = Math.random().toString();
		deepEqual(__ZDRModelSyncCallbackInput('ZDRSchemaSyncCallbackCreate', {
			newValue,
		}), newValue);
	});

	it('returns newValue if ZDRSchemaSyncCallbackUpdate', function() {
		const newValue = Math.random().toString();
		deepEqual(__ZDRModelSyncCallbackInput('ZDRSchemaSyncCallbackUpdate', {
			newValue,
		}), newValue);
	});

	it('returns oldValue if ZDRSchemaSyncCallbackDelete', function() {
		const oldValue = Math.random().toString();
		deepEqual(__ZDRModelSyncCallbackInput('ZDRSchemaSyncCallbackDelete', {
			oldValue,
		}), oldValue);
	});

	it('returns param2 if conflict', function() {
		const item = {
			origin: Math.random().toString(),
		};
		deepEqual(__ZDRModelSyncCallbackInput('ZDRSchemaSyncCallbackConflict', item), item);
	});

});

describe('ZDRWrap', function test_ZDRWrap () {

	const _ZDRWrap = function (inputData = {}) {
		return mod.ZDRWrap(Object.assign({
			ZDRParamLibrary: uStubRemoteStorage(),
			ZDRParamScopes: [uStubScope(Object.assign({
				ZDRScopeSchemas: [uStubSchema(inputData)],
			}, inputData))],
			ZDRParamReadyCallback: (function () {}),
		}, inputData));
	};

	it('throws if not object', function() {
		throws(function() {
			mod.ZDRWrap(null);
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ZDRParamLibrary not valid', function() {
		throws(function() {
			_ZDRWrap({
				ZDRParamLibrary: null,
			});
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ZDRParamScopes not array', function() {
		throws(function() {
			_ZDRWrap({
				ZDRParamScopes: null,
			});
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ZDRParamScopes not filled', function() {
		throws(function() {
			_ZDRWrap({
				ZDRParamScopes: [],
			});
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ZDRParamScopes element not valid', function() {
		throws(function() {
			_ZDRWrap({
				ZDRParamScopes: [{
					ZDRScopeKey: null,
				}],
			});
		}, /ZDRErrorInputNotString/);
	});

	it('throws if ZDRScopeSchemas element not valid', function() {
		throws(function() {
			_ZDRWrap({
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

	it('throws if ZDRParamReadyCallback not function', function () {
		throws(function () {
			_ZDRWrap({
				ZDRParamReadyCallback: null,
			});
		}, /ZDRErrorInputNotValid/);
	});

	it('returns object', function () {
		deepEqual(typeof _ZDRWrap(), 'object');
	});

	it('throws if ZDRParamErrorCallback not function', function () {
		throws(function () {
			_ZDRWrap({
				ZDRParamErrorCallback: null,
			});
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ZDRParamIdentityCallback not function', function () {
		throws(function () {
			_ZDRWrap({
				ZDRParamIdentityCallback: null,
			});
		}, /ZDRErrorInputNotValid/);
	});

	const __ZDRStorage = function (inputData = {}) {
		const ZDRScopeKey = Math.random().toString();

		return _ZDRWrap(Object.assign({
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

	context('ZDRStorageReadFile', function test_ZDRStorageReadFile () {

		it('throws if not string', function() {
			throws(function() {
				__ZDRStorage().ZDRStorageReadFile(null);
			}, /ZDRErrorInputNotValid/);
		});

		it('returns null', function () {
			deepEqual(__ZDRStorage().ZDRStorageReadFile(Math.random().toString()), null);
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

	context('ZDRStorageListPaths', function test_ZDRStorageListPaths () {

		it('throws if not string', function() {
			throws(function() {
				__ZDRStorage().ZDRStorageListPaths(null);
			}, /ZDRErrorInputNotValid/);
		});

		it('returns array', async function () {
			deepEqual(await __ZDRStorage().ZDRStorageListPaths(Math.random().toString()), []);
		});
	
	});

	context('ZDRStorageListPathsRecursive', function test_ZDRStorageListPathsRecursive () {

		it('throws if not string', function() {
			throws(function() {
				__ZDRStorage().ZDRStorageListPathsRecursive(null);
			}, /ZDRErrorInputNotValid/);
		});

		it('calls ZDRStorageListPaths', async function () {
			const inputData = Math.random().toString();
			const file = Math.random().toString();
			const item = Object.assign(__ZDRStorage(), {
				ZDRStorageListPaths: (function () {
					return [file];
				}),
			});
			deepEqual(await item.ZDRStorageListPathsRecursive(inputData), [inputData + file]);
		});

		it('calls ZDRStorageListPaths recursively', async function () {
			const folder = Math.random().toString() + '/';
			const file = Math.random().toString();
			const item = Object.assign(__ZDRStorage(), {
				ZDRStorageListPaths: (function (inputData) {
					return [inputData === folder ? file : folder];
				}),
			});
			deepEqual(await item.ZDRStorageListPathsRecursive(Math.random().toString() + '/'), [folder + file]);
		});

		it('returns array', async function () {
			deepEqual(await __ZDRStorage().ZDRStorageListPathsRecursive(Math.random().toString()), []);
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

	context('ZDRModel', function () {

		const _ZDRModel = function (inputData = {}) {
			const ZDRSchemaKey = Math.random().toString();

			return Object.assign(Object.assign(__ZDRStorage(Object.assign({
				ZDRSchemaKey,
			}, inputData)), inputData)[ZDRSchemaKey], inputData);
		};

		context('ZDRModelPath', function test_ZDRModelPath () {

			it('throws if not object', function() {
				throws(function() {
					_ZDRModel().ZDRModelPath(null);
				}, /ZDRErrorInputNotValid/);
			});

			it('calls ZDRSchemaPathCallback', async function () {
				const inputData = {
					[Math.random().toString()]: Math.random().toString(),
				};

				deepEqual(_ZDRModel({
					ZDRSchemaPathCallback: (function () {
						return JSON.stringify([...arguments]);
					}),
				}).ZDRModelPath(inputData), JSON.stringify([inputData]));
			});

			it('returns result', async function () {
				const item = Math.random().toString();
				deepEqual(_ZDRModel({
					ZDRSchemaPathCallback: (function () {
						return item;
					}),
				}).ZDRModelPath({}), item);
			});
		
		});

		context('ZDRModelWriteObject', function test_ZDRModelWriteObject () {

			it('throws if not object', function() {
				throws(function() {
					_ZDRModel().ZDRModelWriteObject(null);
				}, /ZDRErrorInputNotValid/);
			});

			it('rejects if ZDRSchemaValidationCallback truthy', async function () {
				const item = Math.random().toString();
				await rejects(_ZDRModel({
					ZDRSchemaValidationCallback: (function () {
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
					ZDRSchemaPathCallback: (function () {
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

		context('_ZDRModelListObjects', function test__ZDRModelListObjects () {

			it('calls ZDRStorageListPathsRecursive', function () {
				const item = []

				const model = _ZDRModel({
					ZDRStorageListPathsRecursive: (function () {
						item.push(...arguments);

						return [];
					}),
				})._ZDRModelListObjects();

				deepEqual(item, ['']);
			});

			it('excludes if no match', async function () {
				const item = Math.random().toString();
				deepEqual(await _ZDRModel({
					ZDRStorageListPathsRecursive: (function () {
						return [item];
					}),
					ZDRSchemaStubCallback: (function () {
						return Object.fromEntries([item.split('.')]);
					}),
					ZDRSchemaPathCallback: (function () {
						return Math.random().toString();
					}),
				})._ZDRModelListObjects(), []);
			});

			it('include if match', async function () {
				const item = Math.random().toString();
				deepEqual(await _ZDRModel({
					ZDRStorageListPathsRecursive: (function () {
						return [item];
					}),
					ZDRSchemaStubCallback: (function () {
						return Object.fromEntries([item.split('.')]);
					}),
					ZDRSchemaPathCallback: (function (inputData) {
						return Object.entries(inputData).shift().join('.');
					}),
				})._ZDRModelListObjects(), [item]);
			});
		
		});

		context('ZDRModelListObjects', function test_ZDRModelListObjects () {

			it('calls _ZDRModelListObjects', function () {
				const item = []

				const model = _ZDRModel({
					_ZDRModelListObjects: (function () {
						item.push([...arguments]);

						return [];
					}),
				}).ZDRModelListObjects();

				deepEqual(item, [[]]);
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

		context('ZDRModelDeleteObject', function test_ZDRModelDeleteObject () {

			it('throws if not object', function() {
				throws(function() {
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
					ZDRSchemaPathCallback: (function () {
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

		context('ZDRSchemaMethods', function test_ZDRSchemaMethods () {

			it('throws if not function', function () {
				throws(function () {
					_ZDRWrap(Object.assign({
						ZDRSchemaMethods: {
							[Math.random().toString()]: Math.random().toString(),
						},
					}))
				}, /ZDRErrorInputNotFunction/);
			});

			it('binds wrap to this', function () {
				const ZDRScopeKey = Math.random().toString();
				const ZDRSchemaKey = Math.random().toString();
				const item = Math.random().toString();

				const wrap = _ZDRWrap(Object.assign({
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

	context('ZDRCloudConnect', function test_ZDRCloudConnect () {

		it('throws if not string', function() {
			throws(function() {
				__ZDRStorage().ZDRCloudConnect(null);
			}, /ZDRErrorInputNotValid/);
		});

		it('returns undefined', function () {
			deepEqual(__ZDRStorage().ZDRCloudConnect(Math.random().toString()), undefined);
		});
	
	});

	context('ZDRCloudIsOnline', function test_ZDRCloudIsOnline () {

		it('returns false', function () {
			deepEqual(_ZDRWrap().ZDRCloudIsOnline, false);
		});
	
	});
	
});
