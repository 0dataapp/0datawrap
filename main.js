const uFlatten = function (inputData) {
	return [].concat.apply([], inputData);
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

		if (inputData.ZDRSchemaMethods !== undefined) {
			if (typeof inputData.ZDRSchemaMethods !== 'object' || inputData.ZDRSchemaMethods === null) {
				throw new Error('ZDRErrorInputNotObject');
			}
		}

		if (inputData.ZDRSchemaValidationCallback !== undefined) {
			if (typeof inputData.ZDRSchemaValidationCallback !== 'function') {
				throw new Error('ZDRErrorInputNotFunction');
			}
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

	_ZDRFissionObjectFilter (inputData) {
		if (typeof inputData !== 'string') {
			return false;
		}

		return ['{}', '[]'].includes(inputData[0] + inputData.slice(-1));
	},

	ZDRProtocolRemoteStorage () {
		return 'ZDR_PROTOCOL_REMOTE_STORAGE';
	},

	ZDRProtocolFission () {
		return 'ZDR_PROTOCOL_FISSION';
	},

	_ZDRProtocols () {
		return [
			mod.ZDRProtocolRemoteStorage(),
			mod.ZDRProtocolFission(),
		];
	},

	_ZDRProtocol (inputData) {
		if (typeof inputData === 'function' && Object.keys(inputData).includes('Authorize')) {
			return mod.ZDRProtocolRemoteStorage();
		}
		
		if (!!inputData && typeof inputData === 'object' && Object.keys(inputData).includes('Scenario')) {
			return mod.ZDRProtocolFission();
		}
		
		throw new Error('ZDRErrorInputNotValid');
	},

	ZDRProtocolForIdentity (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('ZDRErrorInputNotValid');
		}
		
		return inputData.match('fission.codes') ? mod.ZDRProtocolFission() : mod.ZDRProtocolRemoteStorage();
	},

	_ZDRClientInterface (_client, protocol) {
		return {

				async ClientWriteObject (param1, param2) {
					await ({
						[mod.ZDRProtocolRemoteStorage()]: (function () {
							return _client.storeFile('application/json', param1, JSON.stringify(param2))
						}),
						[mod.ZDRProtocolFission()]: (function () {
							return _client.write(param1, JSON.stringify(param2)).then(_client.publish);
						}),
					})[protocol]();

					return param2;
				},

				async ClientWriteFile (param1, param2, param3) {
					await ({
						[mod.ZDRProtocolRemoteStorage()]: (function () {
							return _client.storeFile(param3, param1, param2);
						}),
						[mod.ZDRProtocolFission()]: (function () {
							return _client.write(param1, param2).then(_client.publish);
						}),
					})[protocol]();

					return param2;
				},

				ClientReadObject (inputData) {
					return ({
						[mod.ZDRProtocolRemoteStorage()]: (function () {
							return _client.getObject(inputData, false);
						}),
						[mod.ZDRProtocolFission()]: (async function () {
							return JSON.parse(await _client.cat(inputData));
						}),
					})[protocol]();
				},

				ClientReadFile (inputData) {
					return ({
						[mod.ZDRProtocolRemoteStorage()]: (function () {
							return _client.getFile(inputData, false);
						}),
						[mod.ZDRProtocolFission()]: (function () {
							return _client.cat(inputData);
						}),
					})[protocol]();
				},

				async ClientListObjects (inputData) {
					return (await ({
						[mod.ZDRProtocolRemoteStorage()]: (async function () {
							return Object.entries(await _client.getAll(inputData, false)).filter(function ([key, value]) {
								if (mod._ZDRPathIsDirectory(key)) {
									return false;
								}

								if (value === true) {
									return false;
								}

								return true;
							});
						}),
						[mod.ZDRProtocolFission()]: (async function () {
							return (await Promise.all(Object.entries(await _client.ls(inputData)).filter(function ([key, value]) {
								return value.isFile;
							}).map(async function ([key, value]) {
								return [key, await _client.cat(key)];
							}))).reduce(function (coll, [key, value]) {
								if (!mod._ZDRFissionObjectFilter(value)) {
									return coll;
								}

								try {
									return coll.concat([[key, JSON.parse(value)]]);
								} catch (error) {
									return coll;
								}
							}, []);
						}),
					})[protocol]()).reduce(function (coll, [key, value]) {
						return Object.assign(coll, {
							[key]: value,
						});
					}, {});
				},

				async ClientPaths (inputData) {
					return await ({
						[mod.ZDRProtocolRemoteStorage()]: (async function () {
							return Object.keys(await _client.getListing(inputData, false));
						}),
						[mod.ZDRProtocolFission()]: (async function () {
							return Object.entries(await _client.ls(inputData)).map(function ([key, value]) {
								return key + (!value.isFile ? '/' : '');
							});
						}),
					})[protocol]();
				},
				
				ClientDelete (inputData) {
					return ({
						[mod.ZDRProtocolRemoteStorage()]: (function () {
							return _client.remove(inputData);
						}),
						[mod.ZDRProtocolFission()]: (function () {
							return _client.rm(inputData);
						}),
					})[protocol]();
				},

			};
	},

	ZDRWrap (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('ZDRErrorInputNotValid');
		}

		const ZDRStorageProtocol = mod._ZDRProtocol(inputData.ZDRParamLibrary);

		if (!Array.isArray(inputData.ZDRParamScopes) || !inputData.ZDRParamScopes.length) {
			throw new Error('ZDRErrorInputNotValid');
		}

		const scopes = inputData.ZDRParamScopes.filter(mod._ZDRScopeObjectValidate);

		if (!scopes.length) {
			throw new Error('ZDRErrorInputNotValid');
		}

		if (typeof inputData.ZDRParamReadyCallback !== 'function') {
			throw new Error('ZDRErrorInputNotValid');
		}

		if (typeof inputData.ZDRParamErrorCallback !== 'undefined') {
			if (typeof inputData.ZDRParamErrorCallback !== 'function') {
				throw new Error('ZDRErrorInputNotValid');
			}
		};

		const library = {
			[mod.ZDRProtocolRemoteStorage()]: (function () {
				return new (inputData.ZDRParamLibrary)({
					modules: scopes.reduce(function (coll, item) {
						return coll.concat({
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
					}, [])
				});
			}),
			[mod.ZDRProtocolFission()]: (function () {
				return inputData.ZDRParamLibrary;
			}),
		}[ZDRStorageProtocol]();

		const fissionPermissions = {
			permissions: scopes.reduce(function (coll, item) {
				return Object.assign(coll, item.ZDRScopeCreatorDirectory ? {
					app: coll.app || {
					  name: item.ZDRScopeDirectory,
					  creator: item.ZDRScopeCreatorDirectory,
					},
				} : {
				  fs: {
				    privatePaths: ((coll.fs || {}).privatePaths || []).concat(item.ZDRScopeDirectory),
				  }
				});
			}, {}),
		};

		const fissionClient = library.fs || {};
		(async function fissionSetup () {
			if (ZDRStorageProtocol !== mod.ZDRProtocolFission()) {
				return;
			}

			const state = await library.initialize(fissionPermissions);

			if (state.scenario === library.Scenario.AuthCancelled) {
				// User was redirected to lobby,
				// but cancelled the authorisation
				return;
			}

			if (state.scenario === library.Scenario.NotAuthorised) {
				// library.redirectToLobby(state.permissions)
				return;
			}

			if (![library.Scenario.AuthSucceeded, library.Scenario.Continuation].includes(state.scenario)) {
				// error?
				return;
			}

	    Object.assign(fissionClient, state.fs);

	    outputData.ZDRCloudIdentity = state.username;

	    inputData.ZDRParamReadyCallback();
		})();

		const outputData = {

			ZDRStorageProtocol,

			ZDRCloudIsOnline: false,

			ZDRCloudConnect (inputData) {
				if (typeof inputData !== 'string') {
					throw new Error('ZDRErrorInputNotValid');
				}

				return ({
					[mod.ZDRProtocolRemoteStorage()]: (function () {
						return library.connect(inputData);
					}),
					[mod.ZDRProtocolFission()]: (function () {
						return library.initialize(fissionPermissions);
					}),
				})[ZDRStorageProtocol]();
			},

			ZDRCloudDisconnect () {
				return ({
					[mod.ZDRProtocolRemoteStorage()]: (function () {
						return library.disconnect(inputData);
					}),
					[mod.ZDRProtocolFission()]: (function () {
						return library.leave();
					}),
				})[ZDRStorageProtocol]();
			},

		};

		({
			[mod.ZDRProtocolRemoteStorage()]: (function () {
				library.on('error', function (error) {
					if (!library.remote.online && error.message === 'Sync failed: Network request failed.') {
						return;
					};
					
					inputData.ZDRParamErrorCallback(error);
				});

				library.on('connected', function () {
					outputData.ZDRCloudIdentity = library.remote.userAddress
				});

				library.on('network-online', function () {
					outputData.ZDRCloudIsOnline = true;
				});

				library.on('network-offline', function () {
					outputData.ZDRCloudIsOnline = false;
				});

				library.on('ready', function () {
					inputData.ZDRParamReadyCallback();
				});
			}),
			[mod.ZDRProtocolFission()]: (function () {
				return inputData.ZDRParamLibrary;
			}),
		})[ZDRStorageProtocol]();

		return scopes.reduce(function (coll, item) {
			({
				[mod.ZDRProtocolRemoteStorage()]: (function () {
					library.access.claim(item.ZDRScopeDirectory, 'rw');
					
					library.caching.enable(`/${ item.ZDRScopeDirectory }/`);
				}),
				[mod.ZDRProtocolFission()]: (function () {}),
			})[ZDRStorageProtocol]();

			const schemas = (item.ZDRScopeSchemas || []).filter(mod._ZDRSchemaObjectValidate);

			const _client = {
				[mod.ZDRProtocolRemoteStorage()]: (function () {
					return library[item.ZDRScopeDirectory].privateClient;
				}),
				[mod.ZDRProtocolFission()]: (function () {
					return fissionClient;
				}),
			}[ZDRStorageProtocol]();
			const client = mod._ZDRClientInterface(_client, ZDRStorageProtocol);

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

						return client.ClientWriteObject(param1, param2);
					},

					ZDRStorageWriteFile (param1, param2, param3) {
						if (typeof param1 !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						if (typeof param3 !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						return client.ClientWriteFile(param1, param2, param3);
					},

					ZDRStorageReadObject (inputData) {
						if (typeof inputData !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						return client.ClientReadObject(inputData);
					},

					ZDRStorageReadFile (inputData) {
						if (typeof inputData !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						return client.ClientReadFile(inputData);
					},

					ZDRStorageListObjects (inputData) {
						if (typeof inputData !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						return client.ClientListObjects(inputData);
					},

					ZDRStoragePaths (inputData) {
						if (typeof inputData !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						return client.ClientPaths(inputData);
					},

					async _ZDRStoragePathsRecursive (inputData) {
						const _this = this;
						return uFlatten(await Promise.all((await _this.ZDRStoragePaths(inputData)).map(function (e) {
							return mod._ZDRPathIsDirectory(e) ? _this.ZDRStoragePathsRecursive(e) : inputData + e;
						})));
					},

					ZDRStoragePathsRecursive (inputData) {
						if (typeof inputData !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						return this._ZDRStoragePathsRecursive(inputData);
					},

					ZDRStorageDelete (inputData) {
						if (typeof inputData !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						return client.ClientDelete(inputData);
					},

				}, schemas.reduce(function (map, model) {
					return Object.assign(map, {
						[model.ZDRSchemaKey]: Object.assign({

							ZDRModelPath (inputData) {
								if (typeof inputData !== 'object' || inputData === null) {
									throw new Error('ZDRErrorInputNotValid');
								}

								return model.ZDRSchemaPathCallback(inputData);
							},

							ZDRModelWriteObject (inputData) {
								if (model.ZDRSchemaValidationCallback) {
									const outputData = model.ZDRSchemaValidationCallback(inputData);

									if (outputData) {
										return Promise.reject(outputData);
									}
								}

								return coll[item.ZDRScopeKey].ZDRStorageWriteObject(map[model.ZDRSchemaKey].ZDRModelPath(inputData), inputData);
							},

							async _ZDRModelListObjects () {
								const _this = this;

								return (await coll[item.ZDRScopeKey].ZDRStoragePathsRecursive('')).filter(function (e) {
									return e === _this.ZDRModelPath(model.ZDRSchemaStubCallback(e));
								});
							},

							async ZDRModelListObjects () {
								return Promise.all((await this._ZDRModelListObjects()).map(coll[item.ZDRScopeKey].ZDRStorageReadObject));
							},

							ZDRModelDeleteObject (inputData) {
								return coll[item.ZDRScopeKey].ZDRStorageDelete(map[model.ZDRSchemaKey].ZDRModelPath(inputData));
							},

						}, Object.entries(model.ZDRSchemaMethods || {}).reduce(function (coll, [key, value]) {
							if (typeof value !== 'function') {
								throw new Error('ZDRErrorInputNotFunction');
							}
							
							return Object.assign(coll, {
								[key]: value.bind(outputData),
							})
						}, {})),
					});
				}, {})),
			})
		}, outputData);
	},

};

Object.assign(exports, mod);
