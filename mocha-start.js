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
			return Object.assign({
				ZDRClientWriteFile: (function () {}),
				ZDRClientReadFile: (function () {
					return null;
				}),
				ZDRClientListObjects: (function () {
					return {};
				}),
				ZDRClientDelete: (function () {}),
			}, inputData);
		},

		uStubRemoteStorage(inputData = {}) {
			const RemoteStorage = function (params = {}) {
				const scope = (function () {
					return Object.assign({
						storeFile: (function () {}),
						getObject: (function () {}),
						getFile: (function () {}),
						getAll: (function () {
							return {};
						}),
						getListing: (function () {
							return {};
						}),
						remove: (function () {}),
					}, inputData);
				});

				return (params.modules || []).reduce(function (coll, item) {
					return Object.assign(coll, {
						[item.name]: {
							privateClient: scope(),
							publicClient: scope(),
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
			return Object.assign({
				initialize: (function () {}),
				leave: (function () {}),
				_fs: Object.assign({
					write: (async function () {}),
					cat: (function () {
						return null;
					}),
					ls: (function () {
						return {};
					}),
					rm: (function () {}),
					exists: (function () {
						return true;
					}),
				}, inputData),
				Scenario: {
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

	}).map(function (e) {
		return global[e.shift()] = e.pop();
	});
})();
