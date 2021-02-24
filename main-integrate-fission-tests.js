const { rejects, deepEqual } = require('assert');

const mod = require('./main.js');

const webnative = uStubFission();

describe('_ZDRFissionObjectFilter', function test__ZDRFissionObjectFilter() {

	it('returns false if not string', function () {
		deepEqual(mod._ZDRFissionObjectFilter(Math.random()), false);
	});

	it('returns false if not object', function () {
		deepEqual(mod._ZDRFissionObjectFilter(JSON.stringify(Math.random())), false);
	});

	it('returns true if contained in braces', function () {
		deepEqual(mod._ZDRFissionObjectFilter(`{${ Math.random().toString() }}`), true);
	});

	it('returns true if contained in brackets', function () {
		deepEqual(mod._ZDRFissionObjectFilter(`[${ Math.random().toString() }]`), true);
	});

});

describe('_ZDRWrap_Fission', function test__ZDRWrap_Fission() {

	const ZDRScopeDirectory = Math.random().toString();

	const uScopePath = function (inputData) {
		return `/private/${ ZDRScopeDirectory }/${ inputData }`;
	};

	const _ZDRStorageFission = function (inputData = {}) {
		const ZDRScopeKey = inputData.ZDRScopeKey || Math.random().toString();
		const _ZDRScopeDirectory = inputData.ZDRScopeDirectory || ZDRScopeDirectory;

		return mod._ZDRWrap(Object.assign({
			ZDRParamLibrary: webnative,
			ZDRParamScopes: [uStubScope(Object.assign({
				ZDRScopeKey,
				ZDRScopeDirectory: _ZDRScopeDirectory,
			}, inputData))],
			ZDRParamDispatchReady: (function () {}),
		}, inputData))[ZDRScopeKey];
	};

	it('calls ZDRParamDispatchConnected', async function () {
		const username = Math.random().toString();
		deepEqual(await (new Promise(function (res, rej) {
			const item = mod._ZDRWrap({
				ZDRParamLibrary: uStubFission({
					initialize: (function () {
						return {
							scenario: uStubFission().Scenario[uRandomElement('AuthSucceeded', 'Continuation')],
							username,
						};
					}),
				}),
				ZDRParamScopes: [uStubScope()],
				ZDRParamDispatchConnected: (function () {
					return res(...arguments);
				}),
				ZDRParamDispatchReady: (function () {}),
			});
		})), username);
	});

	context('scenario', function () {

		it('calls redirectToLobby if NotAuthorised', async function () {
			const permissions = {
				[Math.random().toString()]: Math.random().toString(),
			};
			await rejects((new Promise(function (res, rej) {
				_ZDRStorageFission({
					ZDRParamLibrary: uStubFission({
						initialize: (function () {
							return {
								scenario: uStubFission().Scenario['NotAuthorised'],
								permissions,
							};
						}),
						redirectToLobby: (function () {
							return rej([...arguments]);
						}),
					}),
				});
			})), [permissions]);
		});

		it('calls ZDRParamDispatchReady if state.scenario success', async function () {
			const item = Math.random().toString();
			await rejects((new Promise(function (res, rej) {
				_ZDRStorageFission({
					ZDRParamLibrary: uStubFission({
						initialize: (function () {
							return {
								scenario: uStubFission().Scenario[uRandomElement('AuthSucceeded', 'Continuation')],
							};
						}),
					}),
					ZDRParamDispatchReady: (function () {
						rej([item]);
					}),
				});
			})), [item]);
		});

	});

	context('ZDRStorageWriteObject', function test_ZDRStorageWriteObject() {

		it('calls fs.write', async function () {
			const param1 = Math.random().toString();
			const param2 = {
				[Math.random().toString()]: Math.random().toString(),
			};

			await rejects(_ZDRStorageFission({
				ZDRScopeDirectory,
				ZDRParamLibrary: uStubFission({
					write: (function () {
						return Promise.reject([...arguments]);
					}),
				}),
			}).ZDRStorageWriteObject(param1, param2), [uScopePath(param1), JSON.stringify(param2)]);
		});

	});

	context('ZDRStorageWriteFile', function test_ZDRStorageWriteFile() {

		it('calls fs.write', async function () {
			const param1 = Math.random().toString();
			const param2 = Math.random().toString();

			await rejects(_ZDRStorageFission({
				ZDRParamLibrary: uStubFission({
					write: (function () {
						return Promise.reject([...arguments]);
					}),
				}),
			}).ZDRStorageWriteFile(param1, param2, Math.random().toString()), [uScopePath(param1), param2]);
		});

	});

	context('ZDRStorageReadObject', function test_ZDRStorageReadObject() {

		it('calls fs.cat', async function () {
			const path = Math.random().toString();
			const item = {
				[Math.random().toString()]: Math.random().toString(),
			};

			deepEqual(await _ZDRStorageFission({
				ZDRParamLibrary: uStubFission({
					cat: (function () {
						return JSON.stringify([item, ...arguments]);
					}),
				}),
			}).ZDRStorageReadObject(path), [item, uScopePath(path)]);
		});

	});

	context('ZDRStorageReadFile', function test_ZDRStorageReadFile() {

		it('calls fs.cat', async function () {
			const path = Math.random().toString();
			const item = JSON.stringify({
				[Math.random().toString()]: Math.random().toString(),
			});

			deepEqual(await _ZDRStorageFission({
				ZDRParamLibrary: uStubFission({
					cat: (function () {
						return [item, ...arguments];
					}),
				}),
			}).ZDRStorageReadFile(path), [item, uScopePath(path)]);
		});

	});

	context('ZDRStorageListObjects', function test_ZDRStorageListObjects() {

		const ZDRScopeKey = Date.now().toString();

		it('calls fs.ls', async function () {
			const item = Math.random().toString();

			await rejects(_ZDRStorageFission({
				ZDRParamLibrary: uStubFission({
					ls: (function () {
						return Promise.reject([...arguments]);
					}),
				}),
			}).ZDRStorageListObjects(item), [uScopePath(item)]);
		});

		it('calls fs.cat', async function () {
			const item = Math.random().toString();

			await rejects(_ZDRStorageFission({
				ZDRParamLibrary: uStubFission({
					ls: (function (inputData) {
						return {
							[item]: {
								isFile: true,
							},
						};
					}),
					cat: (function () {
						return Promise.reject([...arguments]);
					}),
				}),
			}).ZDRStorageListObjects(Date.now().toString()), [item]);
		});

		it('excludes folder', async function () {
			deepEqual(await _ZDRStorageFission({
				ZDRParamLibrary: uStubFission({
					ls: (function (inputData) {
						return {
							[Math.random().toString()]: {
								isFile: false,
							},
						};
					}),
				}),
			}).ZDRStorageListObjects(Math.random().toString()), {});
		});

		it('excludes file', async function () {
			deepEqual(await _ZDRStorageFission({
				ZDRParamLibrary: uStubFission({
					ls: (function (inputData) {
						return {
							[Math.random().toString()]: {
								isFile: true,
							},
						};
					}),
					cat: (function () {
						return Math.random().toString();
					}),
				}),
			}).ZDRStorageListObjects(Math.random().toString()), {});
		});

		it('includes object', async function () {
			const key = Math.random().toString();
			const value = {
				[Math.random().toString()]: Math.random().toString(),
			};

			deepEqual(await _ZDRStorageFission({
				ZDRParamLibrary: uStubFission({
					ls: (function (inputData) {
						return {
							[key]: {
								isFile: true,
							},
						};
					}),
					cat: (function () {
						return JSON.stringify(value);
					}),
				}),
			}).ZDRStorageListObjects(Math.random().toString()), {
				[key]: value,
			});
		});

	});

	context('ZDRStoragePaths', function test_ZDRStoragePaths() {

		const ZDRScopeKey = Date.now().toString();

		it('calls fs.ls', async function () {
			const item = Math.random().toString();

			await rejects(_ZDRStorageFission({
				ZDRParamLibrary: uStubFission({
					ls: (function () {
						return Promise.reject([...arguments]);
					}),
				}),
			}).ZDRStoragePaths(item), [uScopePath(mod._ZDRPathFormatDirectory(item))]);
		});

		it('converts folder', async function () {
			const item = Math.random().toString();

			deepEqual(await _ZDRStorageFission({
				ZDRParamLibrary: uStubFission({
					ls: (function (inputData) {
						return {
							[item]: {
								isFile: false,
							},
						};
					}),
				}),
			}).ZDRStoragePaths(Math.random().toString()), [item + '/']);
		});

		it('converts file', async function () {
			const item = Math.random().toString();

			deepEqual(await _ZDRStorageFission({
				ZDRParamLibrary: uStubFission({
					ls: (function (inputData) {
						return {
							[item]: {
								isFile: true,
							},
						};
					}),
				}),
			}).ZDRStoragePaths(Math.random().toString()), [item]);
		});

	});

	context('ZDRStorageDelete', function test_ZDRStorageDelete() {

		it('calls fs.rm', async function () {
			const item = Math.random().toString();

			deepEqual(uCapture(function (capture) {
				_ZDRStorageFission({
					ZDRParamLibrary: uStubFission({
						rm: (async function () {
							capture(...arguments)
						}),
					}),
				}).ZDRStorageDelete(item)
			}), [uScopePath(item)]);
		});

	});

	context('ZDRCloudConnect', function test_ZDRCloudConnect() {

		it('calls initialize with fs single', function () {
			const ZDRScopeDirectory = Math.random().toString();

			deepEqual(uCapture(function (capture) {
				mod._ZDRWrap({
					ZDRParamLibrary: uStubFission({
						initialize: (function () {
							capture(...arguments);
						}),
					}),
					ZDRParamScopes: [uStubScope({
						ZDRScopeDirectory,
					})],
					ZDRParamDispatchReady: (function () {}),
				}).ZDRCloudConnect(Math.random().toString());
			}).pop().permissions, {
				fs: {
					privatePaths: [
						ZDRScopeDirectory,
					],
				},
			});
		});

		it('calls initialize with fs multiple', function () {
			const ZDRScopeDirectory1 = Math.random().toString();
			const ZDRScopeDirectory2 = Math.random().toString();

			deepEqual(uCapture(function (capture) {
				mod._ZDRWrap({
					ZDRParamLibrary: uStubFission({
						initialize: (function () {
							capture(...arguments);
						}),
					}),
					ZDRParamScopes: [uStubScope({
						ZDRScopeDirectory: ZDRScopeDirectory1,
					}), uStubScope({
						ZDRScopeDirectory: ZDRScopeDirectory2,
					})],
					ZDRParamDispatchReady: (function () {}),
				}).ZDRCloudConnect(Math.random().toString());
			}).pop().permissions, {
				fs: {
					privatePaths: [
						ZDRScopeDirectory1,
						ZDRScopeDirectory2,
					],
				},
			});
		});

		it('calls initialize with app if ZDRScopeCreatorDirectory', function () {
			const ZDRScopeDirectory = Math.random().toString();
			const ZDRScopeCreatorDirectory = Math.random().toString();

			deepEqual(uCapture(function (capture) {
				mod._ZDRWrap({
					ZDRParamLibrary: uStubFission({
						initialize: (function () {
							capture(...arguments);
						}),
					}),
					ZDRParamScopes: [uStubScope({
						ZDRScopeDirectory,
						ZDRScopeCreatorDirectory,
					})],
					ZDRParamDispatchReady: (function () {}),
				}).ZDRCloudConnect(Math.random().toString());
			}).pop().permissions, {
				app: {
					name: ZDRScopeDirectory,
					creator: ZDRScopeCreatorDirectory,
				},
			});
		});

		it('calls initialize with app if ZDRScopeCreatorDirectory multiple', function () {
			const ZDRScopeDirectory = Math.random().toString();
			const ZDRScopeCreatorDirectory = Math.random().toString();

			deepEqual(uCapture(function (capture) {
				mod._ZDRWrap({
					ZDRParamLibrary: uStubFission({
						initialize: (function () {
							capture(...arguments);
						}),
					}),
					ZDRParamScopes: [uStubScope({
						ZDRScopeDirectory,
						ZDRScopeCreatorDirectory,
					}), uStubScope({
						ZDRScopeDirectory: Math.random().toString(),
						ZDRScopeCreatorDirectory: Math.random().toString(),
					})],
					ZDRParamDispatchReady: (function () {}),
				}).ZDRCloudConnect(Math.random().toString());
			}).pop().permissions, {
				app: {
					name: ZDRScopeDirectory,
					creator: ZDRScopeCreatorDirectory,
				},
			});
		});

	});

	context('ZDRCloudReconnect', function test_ZDRCloudReconnect() {

		it('calls leave', async function () {
			const item = Math.random().toString();

			await rejects(mod._ZDRWrap({
				ZDRParamLibrary: uStubFission({
					initialize: (function () {
						return Promise.reject([item]);
					}),
				}),
				ZDRParamScopes: [uStubScope()],
				ZDRParamDispatchReady: (function () {}),
			}).ZDRCloudReconnect(), [item]);
		});

	});

	context('ZDRCloudDisconnect', function test_ZDRCloudDisconnect() {

		it('calls leave', async function () {
			const item = Math.random().toString();

			await rejects(mod._ZDRWrap({
				ZDRParamLibrary: uStubFission({
					leave: (function () {
						return Promise.reject([item]);
					}),
				}),
				ZDRParamScopes: [uStubScope()],
				ZDRParamDispatchReady: (function () {}),
			}).ZDRCloudDisconnect(), [item]);
		});

	});

});
