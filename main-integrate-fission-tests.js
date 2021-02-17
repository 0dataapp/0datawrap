const { rejects, deepEqual } = require('assert');

const mod = require('./main.js');

const webnative = uStubFission();

describe('_ZDRFissionObjectFilter', function test__ZDRFissionObjectFilter() {

	it('returns false if not string', function() {
		deepEqual(mod._ZDRFissionObjectFilter(Math.random()), false);
	});

	it('returns false if not object', function() {
		deepEqual(mod._ZDRFissionObjectFilter(JSON.stringify(Math.random())), false);
	});

	it('returns true if contained in braces', function() {
		deepEqual(mod._ZDRFissionObjectFilter(`{${ Math.random().toString() }}`), true);
	});

	it('returns true if contained in brackets', function() {
		deepEqual(mod._ZDRFissionObjectFilter(`[${ Math.random().toString() }]`), true);
	});

});

describe('ZDRWrap_Fission', function test_ZDRWrap_Fission () {

	const _ZDRStorageFission = function (inputData = {}) {
		const ZDRScopeKey = inputData.ZDRScopeKey || Math.random().toString();

		return mod.ZDRWrap(Object.assign({
			ZDRParamLibrary: webnative,
			ZDRParamScopes: [uStubScope(Object.assign({
				ZDRScopeKey,
			}, inputData))],
			ZDRParamReadyCallback: (function () {}),
		}, inputData))[ZDRScopeKey];
	};

	context('ZDRCloudConnect', function test_ZDRCloudConnect () {

		it('calls initialize with fs single', function () {
			const ZDRScopeDirectory = Math.random().toString();

			deepEqual(uCapture(function (outputData) {
				mod.ZDRWrap({
					ZDRParamLibrary: uStubFission({
						initialize: (function () {
							outputData.push(...arguments);
						}),
					}),
					ZDRParamScopes: [uStubScope({
						ZDRScopeDirectory,
					})],
					ZDRParamReadyCallback: (function () {}),
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

			deepEqual(uCapture(function (outputData) {
				mod.ZDRWrap({
					ZDRParamLibrary: uStubFission({
						initialize: (function () {
							outputData.push(...arguments);
						}),
					}),
					ZDRParamScopes: [uStubScope({
						ZDRScopeDirectory: ZDRScopeDirectory1,
					}), uStubScope({
						ZDRScopeDirectory: ZDRScopeDirectory2,
					})],
					ZDRParamReadyCallback: (function () {}),
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

			deepEqual(uCapture(function (outputData) {
				mod.ZDRWrap({
					ZDRParamLibrary: uStubFission({
						initialize: (function () {
							outputData.push(...arguments);
						}),
					}),
					ZDRParamScopes: [uStubScope({
						ZDRScopeDirectory,
						ZDRScopeCreatorDirectory,
					})],
					ZDRParamReadyCallback: (function () {}),
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

			deepEqual(uCapture(function (outputData) {
				mod.ZDRWrap({
					ZDRParamLibrary: uStubFission({
						initialize: (function () {
							outputData.push(...arguments);
						}),
					}),
					ZDRParamScopes: [uStubScope({
						ZDRScopeDirectory,
						ZDRScopeCreatorDirectory,
					}), uStubScope({
						ZDRScopeDirectory: Math.random().toString(),
						ZDRScopeCreatorDirectory: Math.random().toString(),
					})],
					ZDRParamReadyCallback: (function () {}),
				}).ZDRCloudConnect(Math.random().toString());
			}).pop().permissions, {
				app: {
				  name: ZDRScopeDirectory,
				  creator: ZDRScopeCreatorDirectory,
				},
			});
		});
	
	});

	context('ZDRCloudDisconnect', function test_ZDRCloudDisconnect () {

		it('calls leave', async function () {
			const item = Math.random().toString();
			
			await rejects(mod.ZDRWrap({
				ZDRParamLibrary: uStubFission({
					leave: (function () {
						return Promise.reject([item]);
					}),
				}),
				ZDRParamScopes: [uStubScope()],
				ZDRParamReadyCallback: (function () {}),
			}).ZDRCloudDisconnect(), [item]);
		});
	
	});

	context('ZDRStorageWriteObject', function test_ZDRStorageWriteObject () {

		it('calls fs.write', async function () {
			const param1 = Math.random().toString();
			const param2 = {
				[Math.random().toString()]: Math.random().toString(),
			};

			await rejects(_ZDRStorageFission({
				ZDRParamLibrary: uStubFission({
					write: (function () {
						return Promise.reject([...arguments]);
					}),
				}),
			}).ZDRStorageWriteObject(param1, param2), [param1, JSON.stringify(param2)]);
		});
	
	});

	context('ZDRStorageWriteFile', function test_ZDRStorageWriteFile () {

		it('calls fs.write', async function () {
			const param1 = Math.random().toString();
			const param2 = Math.random().toString();

			await rejects(_ZDRStorageFission({
				ZDRParamLibrary: uStubFission({
					write: (function () {
						return Promise.reject([...arguments]);
					}),
				}),
			}).ZDRStorageWriteFile(param1, param2, Math.random().toString()), [param1, param2]);
		});
	
	});

	context('ZDRStorageReadObject', function test_ZDRStorageReadObject () {

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
			}).ZDRStorageReadObject(path), [item, path]);
		});
	
	});

	context('ZDRStorageReadFile', function test_ZDRStorageReadFile () {

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
			}).ZDRStorageReadFile(path), [item, path]);
		});
	
	});

	context('ZDRStorageListObjects', function test_ZDRStorageListObjects () {

		const ZDRScopeKey = Date.now().toString();

		it('calls fs.ls', async function () {
			const item = Math.random().toString();
			
			await rejects(_ZDRStorageFission({
				ZDRParamLibrary: uStubFission({
					ls: (function () {
						return Promise.reject([...arguments]);
					}),
				}),
			}).ZDRStorageListObjects(item), [item]);
		});

		it('calls fs.cat', async function () {
			const item = Math.random().toString();
			
			await rejects(_ZDRStorageFission({
				ZDRParamLibrary: uStubFission({
					ls: (function (inputData) {
						return {
							[inputData.slice(1)]: {
								isFile: true,
							},
						};
					}),
					cat: (function () {
						return Promise.reject([...arguments]);
					}),
				}),
			}).ZDRStorageListObjects(item), [item.slice(1)]);
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

	context('ZDRStorageListPaths', function test_ZDRStorageListPaths () {

		const ZDRScopeKey = Date.now().toString();

		it('calls fs.ls', async function () {
			const item = Math.random().toString();
			
			await rejects(_ZDRStorageFission({
				ZDRParamLibrary: uStubFission({
					ls: (function () {
						return Promise.reject([...arguments]);
					}),
				}),
			}).ZDRStorageListPaths(item), [item]);
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
			}).ZDRStorageListPaths(Math.random().toString()), [item + '/']);
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
			}).ZDRStorageListPaths(Math.random().toString()), [item]);
		});
	
	});

	context('ZDRStorageDelete', function test_ZDRStorageDelete () {

		it('calls fs.rm', async function () {
			const item = Math.random().toString();
			
			deepEqual(await _ZDRStorageFission({
				ZDRParamLibrary: uStubFission({
					rm: (function () {
						return [...arguments];
					}),
				}),
			}).ZDRStorageDelete(item), [item]);
		});
	
	});

	context('ZDRParamReadyCallback', function test_ZDRParamReadyCallback () {

		it('calls if state.scenario success', async function () {
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
					ZDRParamReadyCallback: (function () {
						rej([item])
					}),
				})
			})), [item]);
		});
	
	});

	context('ZDRCloudIdentity', function test_ZDRCloudIdentity () {

		it('updates on initialize', async function () {
			const username = Math.random().toString();

			deepEqual(await (new Promise(function (res, rej) {
				const item = mod.ZDRWrap({
					ZDRParamLibrary: uStubFission({
						initialize: (function () {
							return {
								scenario: uStubFission().Scenario[uRandomElement('AuthSucceeded', 'Continuation')],
								username,
							};
						}),
					}),
					ZDRParamScopes: [uStubScope()],
					ZDRParamReadyCallback: (function () {
						res(item.ZDRCloudIdentity)
					}),
				})
			})), username);
		});

	});
	
});
