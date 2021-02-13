const uIsRemoteStorage = function (inputData) {
	if (typeof inputData !== 'function') {
		return false;
	}

	return Object.keys(inputData).includes('Authorize');
};

const mod = {

	_ZDRScopesObjectValidate (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('ZDRErrorInputNotValid');
		}

		if (typeof inputData.ZDRScopeKey !== 'string') {
			throw new Error('ZDRErrorInputNotString');
		}

		if (inputData.ZDRScopeKey.trim() === '') {
			throw new Error('ZDRErrorInputNotFilled');
		}

		if (inputData.ZDRScopeKey.trim() !== inputData.ZDRScopeKey) {
			throw new Error('ZDRErrorInputNotTrimmed');
		}

		return true;
	},

	ZDRStorage (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('ZDRErrorInputNotValid');
		}

		if (!uIsRemoteStorage(inputData.ZDRParamLibrary)) {
			throw new Error('ZDRErrorInputNotValid');
		}

		if (!Array.isArray(inputData.ZDRParamScopes) || !inputData.ZDRParamScopes.length) {
			throw new Error('ZDRErrorInputNotValid');
		}

		const scopes = inputData.ZDRParamScopes.filter(mod._ZDRScopesObjectValidate);

		if (!scopes.length) {
			throw new Error('ZDRErrorInputNotValid');
		}

		const library = new (inputData.ZDRParamLibrary)();

		return scopes.reduce(function (coll, item) {
			library.access.claim(item.ZDRScopeKey, 'rw');

			const _client = library.scope(`/${ item.ZDRScopeKey }/`);
			const client = {

				async ClientStoreObject (param1, param2) {
					await _client.storeFile('application/json', param1, JSON.stringify(param2));

					return param2;
				},

				async ClientStoreFile (param1, param2, param3) {
					await _client.storeFile(param3, param1, param2);

					return param2;
				},

				ClientGetObject (inputData) {
					return _client.getObject(inputData, false);
				},

				async ClientGetAll (inputData) {
					return Object.entries(await _client.getAll(inputData, false)).reduce(function (coll, [key, value]) {
						if (key.slice(-1) === '/') {
							return coll;
						}

						if (value === true) {
							return coll;
						}

						return Object.assign(coll, {
							[key]: value,
						});
					}, {});
				},

				ClientGetListing (inputData) {
					return _client.getListing(inputData, false);
				},
				
				ClientRemove (inputData) {
					return _client.remove(inputData);
				},

			};

			return Object.assign(coll, {
				[item.ZDRScopeKey]: {

					ZDRStorageWriteObject (param1, param2) {
						if (typeof param1 !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						if (typeof param2 !== 'object' || param2 === null) {
							throw new Error('ZDRErrorInputNotValid');
						}

						return client.ClientStoreObject(param1, param2);
					},

					ZDRStorageWriteFile (param1, param2, param3) {
						if (typeof param1 !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						if (typeof param3 !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						return client.ClientStoreFile(param1, param2, param3);
					},

					ZDRStorageReadObject (inputData) {
						if (typeof inputData !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						return client.ClientGetObject(inputData);
					},

					ZDRStorageListObjects (inputData) {
						if (typeof inputData !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						return client.ClientGetAll(inputData);
					},

					ZDRStorageListDetails (inputData) {
						if (typeof inputData !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						return client.ClientGetListing(inputData);
					},

					ZDRStorageDelete (inputData) {
						if (typeof inputData !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						return client.ClientRemove(inputData);
					},

				},
			})
		}, {});
	},

};

Object.assign(exports, mod);
