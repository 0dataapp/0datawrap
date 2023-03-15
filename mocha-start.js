(function KVCMochaStubs() {
	Object.entries({

		uStubSchema(inputData = {}) {
			return Object.assign({
				ZDRSchemaKey: Math.random().toString(),
				ZDRSchemaPath: (function () {
					return Math.random().toString();
				}),
				ZDRSchemaStub: (function () {
					return {};
				}),
			}, inputData);
		},

		uStubScope(inputData = {}) {
			return Object.assign({
				ZDRScopeKey: Math.random().toString(),
				ZDRScopeDirectory: Math.random().toString(),
			}, inputData);
		},

		uStubCustomClient(inputData = {}) {
			const tree = {};
			return Object.assign({
				ZDRClientWriteFile: (function (param1, param2, param3) {
					tree[param1] = param2;
				}),
				ZDRClientReadFile: (function (inputData) {
					return tree[inputData];
				}),
				ZDRClientListObjects: (function () {
					return tree;
				}),
				ZDRClientDelete: (function (inputData) {}),
			}, inputData);
		},

		uStubRemoteStorage(inputData = {}) {
			const RemoteStorage = function (params = {}) {
				return (params.modules || []).reduce(function (coll, item) {
					const scope = (function () {
						const tree = {};
						return {
							storeFile: (function (param1, param2, param3) {
								tree[param2] = {
									data: param3,
								};
							}),
							getFile: (function (inputData) {
								return tree[inputData];
							}),
							getAll: (function () {
								return tree;
							}),
							getListing: (function () {
								return {};
							}),
							getItemURL: (function () {}),
							remove: (function () {}),
						};
					});
					
					return Object.assign(coll, {
						[item.name]: {
							privateClient: Object.assign(scope(), inputData.FakePublicClient ? {} : inputData),
							publicClient: Object.assign(scope(), inputData.FakePublicClient ? inputData : {}),
						},
					});
				}, Object.assign({
					access: Object.assign({
						claim: (function () {}),
					}, inputData),
					caching: Object.assign({
						enable: (function () {}),
					}, inputData),
					connect: (function () {}),
					reconnect: (function () {}),
					disconnect: (function () {}),
					on: (function (param1, param2) {
						if (param1 !== 'ready') {
							return;
						}

						return param2();
					}),
					remote: {},
				}, inputData));
			};

			RemoteStorage.Authorize = Math.random().toString();

			return RemoteStorage;
		},

		uStubFission(inputData = {}) {
			const tree = {};
			return Object.assign({
				initialize: (function () {}),
				leave: (function () {}),
				_fs: Object.assign({
					root: Object.assign({
						put: (function () {}),
					}, inputData),
					write: (async function (param1, param2) {
						tree[param1] = param2;
					}),
					cat: (function (inputData) {
						const search = '/private';
						if (inputData.match(search)) {
							inputData = [search, inputData.split(search).pop()].join('');
						}
						return tree[inputData];
					}),
					ls: (function () {
						return Object.fromEntries(Object.entries(tree).map(function ([key, value]) {
							return [key, {
								isFile: true,
							}];
						}));
					}),
					rm: (async function () {}),
					publish: (async function () {}),
					exists: (function () {
						return true;
					}),
				}, inputData),
				Scenario: {
					AuthCancelled: 'AuthCancelled',
					NotAuthorised: 'NotAuthorised',
					AuthSucceeded: 'AuthSucceeded',
					Continuation: 'Continuation',
				},
			}, inputData);
		},

		uStubLocalStorage(inputData = {}) {
			return Object.assign({
				getItem: (function () {}),
				setItem: (function () {}),
			}, inputData);
		},

		uStubFilePath () {
			return Date.now().toString() + '/' + Date.now().toString();
		},

	}).map(function (e) {
		return global[e.shift()] = e.pop();
	});
})();
