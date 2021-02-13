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
			const client = library.scope(`/${ item.ZDRScopeKey }/`);
			const _client = {
				async ClientStoreObject (param1, param2) {
					await client.storeFile('application/json', param1, JSON.stringify(param2));

					return param2;
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

						return _client.ClientStoreObject(param1, param2);
					},

				},
			})
		}, {});
	},

};

Object.assign(exports, mod);
