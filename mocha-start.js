global.fetch = function () {}; // remotestorage.js requires a polyfill for global.fetch on node.js 17 and under

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
						return Object.assign({
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
						}, inputData);
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

			RemoteStorage.Unauthorized = Math.random().toString();

			return RemoteStorage;
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
