const uFlatten = function (inputData) {
	return [].concat.apply([], inputData);
};

const uIsRemoteStorage = function (inputData) {
	if (typeof inputData !== 'function') {
		return false;
	}

	return Object.keys(inputData).includes('Authorize');
};

const mod = {

	_ZDRScopeObjectValidate (inputData) {
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

		if (inputData.ZDRScopeModels !== undefined) {
			if (!Array.isArray(inputData.ZDRScopeModels)) {
				throw new Error('ZDRErrorInputNotValid');
			}
		}

		return true;
	},

	_ZDRSchemaObjectValidate (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('ZDRErrorInputNotValid');
		}

		if (typeof inputData.ZDRSchemaKey !== 'string') {
			throw new Error('ZDRErrorInputNotString');
		}

		if (inputData.ZDRSchemaKey.trim() === '') {
			throw new Error('ZDRErrorInputNotFilled');
		}

		if (inputData.ZDRSchemaKey.trim() !== inputData.ZDRSchemaKey) {
			throw new Error('ZDRErrorInputNotTrimmed');
		}

		if (typeof inputData.ZDRSchemaPathCallback !== 'function') {
			throw new Error('ZDRErrorInputNotFunction');
		}

		if (typeof inputData.ZDRSchemaStubCallback !== 'function') {
			throw new Error('ZDRErrorInputNotFunction');
		}

		return true;
	},

	_ZDRPathIsDirectory (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('ZDRErrorInputNotValid');
		}

		return inputData.slice(-1) === '/';
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

		const scopes = inputData.ZDRParamScopes.filter(mod._ZDRScopeObjectValidate);

		if (!scopes.length) {
			throw new Error('ZDRErrorInputNotValid');
		}

		if (typeof inputData.ZDRParamErrorCallback !== 'function') {
			throw new Error('ZDRErrorInputNotValid');
		}

		if (typeof inputData.ZDRParamIdentityCallback !== 'function') {
			throw new Error('ZDRErrorInputNotValid');
		}

		const library = new (inputData.ZDRParamLibrary)();

		library.on('error', function (error) {
			if (!library.remote.online && error.message === 'Sync failed: Network request failed.') {
				return;
			};
			
			inputData.ZDRParamErrorCallback(error);
		});

		library.on('connected', function () {
			inputData.ZDRParamIdentityCallback(library.remote.userAddress);
		});

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
						if (mod._ZDRPathIsDirectory(key)) {
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

				async ClientGetListing (inputData) {
					return Object.keys(await _client.getListing(inputData, false));
				},
				
				ClientRemove (inputData) {
					return _client.remove(inputData);
				},
				
				ClientConnect (inputData) {
					return library.connect(inputData);
				},

			};

			return Object.assign(coll, {
				[item.ZDRScopeKey]: Object.assign({

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

					ZDRStorageListPaths (inputData) {
						if (typeof inputData !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						return client.ClientGetListing(inputData);
					},

					async _ZDRStorageListPathsRecursive (inputData) {
						const _this = this;
						return uFlatten(await Promise.all((await _this.ZDRStorageListPaths(inputData)).map(function (e) {
							return mod._ZDRPathIsDirectory(e) ? _this.ZDRStorageListPathsRecursive(e) : inputData + e;
						})));
					},

					ZDRStorageListPathsRecursive (inputData) {
						if (typeof inputData !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						return this._ZDRStorageListPathsRecursive(inputData);
					},

					ZDRStorageDelete (inputData) {
						if (typeof inputData !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						return client.ClientRemove(inputData);
					},

					ZDRCloudConnect (inputData) {
						if (typeof inputData !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						return client.ClientConnect(inputData);
					},

				}, (item.ZDRScopeModels || []).filter(mod._ZDRSchemaObjectValidate).reduce(function (map, model) {
					return Object.assign(map, {
						[model.ZDRSchemaKey]: {

							ZDRModelPath (inputData) {
								if (typeof inputData !== 'object' || inputData === null) {
									throw new Error('ZDRErrorInputNotValid');
								}

								return model.ZDRSchemaPathCallback(inputData);
							},

							ZDRModelWriteObject (inputData) {
								return coll[item.ZDRScopeKey].ZDRStorageWriteObject(map[model.ZDRSchemaKey].ZDRModelPath(inputData), inputData);
							},

							async _ZDRModelListObjects () {
								const _this = this;

								return (await coll[item.ZDRScopeKey].ZDRStorageListPathsRecursive('/')).filter(function (e) {
									return e === _this.ZDRModelPath(model.ZDRSchemaStubCallback(e));
								});
							},

							async ZDRModelListObjects () {
								const _this = this;

								return Promise.all((await _this._ZDRModelListObjects()).map(_this.ZDRStorageReadObject));
							},

						},
					});
				}, {})),
			})
		}, {});
	},

};

Object.assign(exports, mod);
