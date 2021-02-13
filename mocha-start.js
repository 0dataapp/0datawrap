(function KVCMochaStubs() {
	Object.entries({

		uRemoteStorage (inputData = {}) {
			const RemoteStorage = function (params = {}) {
				return (params.modules || []).reduce(function (coll, item) {
					return Object.assign(coll, {
						[item.name]: item.builder().exports,
					});
				}, {
					access: Object.assign({
						claim: (function () {}),
					}, inputData),
					scope: (function () {
						return Object.assign({
							storeFile: (function() {}),
							getObject: (function() {}),
							getAll: (function() {
								return {};
							}),
							getListing: (function() {
								return {};
							}),
							remove: (function() {}),
						}, inputData);
					}),
				});
			};

			RemoteStorage.Authorize = Math.random().toString();

			return RemoteStorage;
		},

	}).map(function (e) {
		return global[e.shift()]  = e.pop();
	});
})();
