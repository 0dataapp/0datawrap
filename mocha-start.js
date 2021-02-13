(function KVCMochaStubs() {
	Object.entries({

		uRemoteStorage (inputData = {}) {
			const RemoteStorage = function (params = {}) {
				return (params.modules || []).reduce(function (coll, item) {
					return Object.assign(coll, {
						[item.name]: item.builder().exports,
					});
				}, {
					scope: (function () {
						return Object.assign({
							storeFile: (function() {}),
							getObject: (function() {}),
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
