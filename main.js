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

		if (typeof inputData.ZDRSchemaStubCallback !== 'function') {
			throw new Error('ZDRErrorInputNotFunction');
		}

		if (typeof inputData.ZDRSchemaPathCallback !== 'function') {
			throw new Error('ZDRErrorInputNotFunction');
		}

		if (inputData.ZDRSchemaSyncCallbackCreate !== undefined) {
			if (typeof inputData.ZDRSchemaSyncCallbackCreate !== 'function') {
				throw new Error('ZDRErrorInputNotFunction');
			}
		}

		if (inputData.ZDRSchemaSyncCallbackUpdate !== undefined) {
			if (typeof inputData.ZDRSchemaSyncCallbackUpdate !== 'function') {
				throw new Error('ZDRErrorInputNotFunction');
			}
		}

		if (inputData.ZDRSchemaSyncCallbackDelete !== undefined) {
			if (typeof inputData.ZDRSchemaSyncCallbackDelete !== 'function') {
				throw new Error('ZDRErrorInputNotFunction');
			}
		}

		if (inputData.ZDRSchemaSyncCallbackConflict !== undefined) {
			if (typeof inputData.ZDRSchemaSyncCallbackConflict !== 'function') {
				throw new Error('ZDRErrorInputNotFunction');
			}
		}

		return true;
	},

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

		if (typeof inputData.ZDRScopeDirectory !== 'string') {
			throw new Error('ZDRErrorInputNotString');
		}

		if (inputData.ZDRScopeDirectory.trim() === '') {
			throw new Error('ZDRErrorInputNotFilled');
		}

		if (inputData.ZDRScopeDirectory.trim() !== inputData.ZDRScopeDirectory) {
			throw new Error('ZDRErrorInputNotTrimmed');
		}

		if (inputData.ZDRScopeSchemas !== undefined) {
			if (!Array.isArray(inputData.ZDRScopeSchemas)) {
				throw new Error('ZDRErrorInputNotValid');
			}
		}

		if (inputData.ZDRScopeCreatorDirectory !== undefined) {
			if (typeof inputData.ZDRScopeCreatorDirectory !== 'string') {
				throw new Error('ZDRErrorInputNotString');
			}

			if (inputData.ZDRScopeCreatorDirectory.trim() === '') {
				throw new Error('ZDRErrorInputNotFilled');
			}

			if (inputData.ZDRScopeCreatorDirectory.trim() !== inputData.ZDRScopeCreatorDirectory) {
				throw new Error('ZDRErrorInputNotTrimmed');
			}
		}

		return true;
	},

	_ZDRPathIsDirectory (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('ZDRErrorInputNotValid');
		}

		return inputData.slice(-1) === '/';
	},

	_ZDRModelSyncCallbackSignatures () {
		return [
			'ZDRSchemaSyncCallbackCreate',
			'ZDRSchemaSyncCallbackUpdate',
			'ZDRSchemaSyncCallbackDelete',
			'ZDRSchemaSyncCallbackConflict',
		];
	},

	_ZDRModelSyncCallbackInput (param1, param2) {
		if (!mod._ZDRModelSyncCallbackSignatures().includes(param1)) {
			throw new Error('ZDRErrorInputNotValid');
		}

		if (!param2.origin) {
			throw new Error('ZDRErrorInputNotValid');
		}

		if (param1 === 'ZDRSchemaSyncCallbackConflict') {
			return param2;
		}

		return param2[param1 === 'ZDRSchemaSyncCallbackDelete' ? 'oldValue' : 'newValue'];
	},

	_ZDRModelSyncCallbackSignature (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return;
		}

		if (inputData.origin === 'remote' && typeof inputData.oldValue === 'undefined' && typeof inputData.newValue !== 'undefined') {
			return 'ZDRSchemaSyncCallbackCreate';
		}

		if (inputData.origin === 'remote' && typeof inputData.oldValue !== 'undefined' && typeof inputData.newValue !== 'undefined') {
			return 'ZDRSchemaSyncCallbackUpdate';
		}

		if (inputData.origin === 'remote' && typeof inputData.oldValue !== 'undefined' && typeof inputData.newValue === 'undefined') {
			return 'ZDRSchemaSyncCallbackDelete';
		}

		if (inputData.origin === 'conflict') {
			return 'ZDRSchemaSyncCallbackConflict';
		}

		return;
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

		if (typeof inputData.ZDRParamErrorCallback !== 'undefined') {
			if (typeof inputData.ZDRParamErrorCallback !== 'function') {
				throw new Error('ZDRErrorInputNotValid');
			}
		};

		if (typeof inputData.ZDRParamIdentityCallback !== 'undefined') {
			if (typeof inputData.ZDRParamIdentityCallback !== 'function') {
				throw new Error('ZDRErrorInputNotValid');
			}
		};

		const outputData = {
			ZDRCloudIsOnline: false,
		};

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

		library.on('network-online', function () {
			outputData.ZDRCloudIsOnline = true;
		});

		library.on('network-offline', function () {
			outputData.ZDRCloudIsOnline = false;
		});

		return scopes.reduce(function (coll, item) {
			library.access.claim(item.ZDRScopeDirectory, 'rw');

			library.addModule({
				name: item.ZDRScopeDirectory,
				builder: (function (privateClient, publicClient) {
					return {
						exports: {
							privateClient,
							publicClient,
						},
					};
				}),
			});

			const schemas = (item.ZDRScopeSchemas || []).filter(mod._ZDRSchemaObjectValidate);

			const _client = library[item.ZDRScopeDirectory].privateClient;
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

				ClientGetFile (inputData) {
					return _client.getFile(inputData, false);
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

			if (schemas.filter(function (e) {
				return Object.keys(e).filter(function (e) {
					return mod._ZDRModelSyncCallbackSignatures().includes(e);
				}).length;
			}).length) {
				_client.on('change', function (event) {
					schemas.forEach(function (e) {
						if (e.ZDRSchemaPathCallback(e.ZDRSchemaStubCallback(event.relativePath)) !== event.relativePath) {
							return;
						}

						const signature = mod._ZDRModelSyncCallbackSignature(event);
						
						if (!signature) {
							return;
						}

						if (!e[signature]) {
							return;
						}

						return e[signature](mod._ZDRModelSyncCallbackInput(signature, event));
					});
				});
			}

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

					ZDRStorageReadFile (inputData) {
						if (typeof inputData !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						return client.ClientGetFile(inputData);
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

				}, schemas.reduce(function (map, model) {
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
		}, outputData);
	},

};

Object.assign(exports, mod);
