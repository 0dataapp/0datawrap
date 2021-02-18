(function KVCMochaStubs() {
	Object.entries({

		uStubSchema (inputData = {})	{
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

		uStubScope (inputData = {})	{
			return Object.assign({
				ZDRScopeKey: Math.random().toString(),
				ZDRScopeDirectory: Math.random().toString(),
			}, inputData);
		},

		uStubClient (inputData = {})	{
			return Object.assign({
				ZDRClientWriteFile: (function () {}),
				ZDRClientReadFile: (function () {}),
				ZDRClientListObjects: (function () {}),
				ZDRClientDelete: (function () {}),
			}, inputData);
		},

		uStubRemoteStorage (inputData = {}) {
			const RemoteStorage = function (params = {}) {
				const scope = (function () {
					return Object.assign({
						storeFile: (function() {}),
						getObject: (function() {}),
						getFile: (function() {}),
						getAll: (function() {
							return {};
						}),
						getListing: (function() {
							return {};
						}),
						remove: (function() {}),
						on: (function () {}),
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
					disconnect: (function () {}),
					on: (function () {}),
					remote: {},
				}, inputData));
			};

			RemoteStorage.Authorize = Math.random().toString();

			return RemoteStorage;
		},

		uStubFission (inputData = {}) {
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
				}, inputData),
				Scenario: {
					AuthSucceeded: 'AuthSucceeded',
					Continuation: 'Continuation',
				},
			}, inputData);
		},

	}).map(function (e) {
		return global[e.shift()]  = e.pop();
	});
})();
