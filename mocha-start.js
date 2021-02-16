(function KVCMochaStubs() {
	Object.entries({

		uStubSchema (inputData = {})	{
			return Object.assign({
				ZDRSchemaKey: Math.random().toString(),
				ZDRSchemaPathCallback: (function () {
					return Math.random().toString();
				}),
				ZDRSchemaStubCallback: (function () {
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

		uStubRemoteStorage (inputData = {}) {
			const RemoteStorage = function (params = {}) {
				return (params.modules || []).reduce(function (coll, item) {
					return Object.assign(coll, {
						[item.name]: item.builder().exports,
					});
				}, Object.assign({
					access: Object.assign({
						claim: (function () {}),
					}, inputData),
					scope: (function () {
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
					}),
					connect: (function () {}),
					on: (function () {}),
					remote: {},
					addModule: (function (inputData) {
						this[inputData.name] = {
							privateClient: this.scope(),
							publicClient: this.scope(),
						};
					}),
				}, inputData));
			};

			RemoteStorage.Authorize = Math.random().toString();

			return RemoteStorage;
		},

	}).map(function (e) {
		return global[e.shift()]  = e.pop();
	});
})();
