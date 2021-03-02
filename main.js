const uFlatten = function (inputData) {
	return [].concat.apply([], inputData);
};

const mod = {

	_ZDRSchemaObjectValidate(inputData) {
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

		if (typeof inputData.ZDRSchemaStub !== 'function') {
			throw new Error('ZDRErrorInputNotFunction');
		}

		if (typeof inputData.ZDRSchemaPath !== 'function') {
			throw new Error('ZDRErrorInputNotFunction');
		}

		if (inputData.ZDRSchemaMethods !== undefined) {
			if (typeof inputData.ZDRSchemaMethods !== 'object' || inputData.ZDRSchemaMethods === null) {
				throw new Error('ZDRErrorInputNotObject');
			}
		}

		if (inputData.ZDRSchemaDispatchValidate !== undefined) {
			if (typeof inputData.ZDRSchemaDispatchValidate !== 'function') {
				throw new Error('ZDRErrorInputNotFunction');
			}
		}

		if (inputData.ZDRSchemaDispatchSyncCreate !== undefined) {
			if (typeof inputData.ZDRSchemaDispatchSyncCreate !== 'function') {
				throw new Error('ZDRErrorInputNotFunction');
			}
		}

		if (inputData.ZDRSchemaDispatchSyncUpdate !== undefined) {
			if (typeof inputData.ZDRSchemaDispatchSyncUpdate !== 'function') {
				throw new Error('ZDRErrorInputNotFunction');
			}
		}

		if (inputData.ZDRSchemaDispatchSyncDelete !== undefined) {
			if (typeof inputData.ZDRSchemaDispatchSyncDelete !== 'function') {
				throw new Error('ZDRErrorInputNotFunction');
			}
		}

		if (inputData.ZDRSchemaDispatchSyncConflict !== undefined) {
			if (typeof inputData.ZDRSchemaDispatchSyncConflict !== 'function') {
				throw new Error('ZDRErrorInputNotFunction');
			}
		}

		return true;
	},

	_ZDRScopeObjectValidate(inputData) {
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

	_ZDRClientObjectValidate(inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('ZDRErrorInputNotValid');
		}

		if (typeof inputData.ZDRClientWriteFile !== 'function') {
			throw new Error('ZDRErrorInputNotFunction');
		}

		if (typeof inputData.ZDRClientReadFile !== 'function') {
			throw new Error('ZDRErrorInputNotFunction');
		}

		if (typeof inputData.ZDRClientListObjects !== 'function') {
			throw new Error('ZDRErrorInputNotFunction');
		}

		if (typeof inputData.ZDRClientDelete !== 'function') {
			throw new Error('ZDRErrorInputNotFunction');
		}

		if (inputData.ZDRClientPrepare !== undefined) {
			if (typeof inputData.ZDRClientPrepare !== 'function') {
				throw new Error('ZDRErrorInputNotFunction');
			}
		}

		if (inputData.ZDRClientConnect !== undefined) {
			if (typeof inputData.ZDRClientConnect !== 'function') {
				throw new Error('ZDRErrorInputNotFunction');
			}
		}

		if (inputData.ZDRClientReconnect !== undefined) {
			if (typeof inputData.ZDRClientReconnect !== 'function') {
				throw new Error('ZDRErrorInputNotFunction');
			}
		}

		if (inputData.ZDRClientDisconnect !== undefined) {
			if (typeof inputData.ZDRClientDisconnect !== 'function') {
				throw new Error('ZDRErrorInputNotFunction');
			}
		}

		return true;
	},

	_ZDRPathIsDirectory(inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('ZDRErrorInputNotValid');
		}

		return inputData.slice(-1) === '/';
	},

	_ZDRPathFormatDirectory(inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('ZDRErrorInputNotValid');
		}

		return mod._ZDRPathIsDirectory(inputData) ? inputData : inputData.concat('/')
	},

	_ZDRPathFormatPath(inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('ZDRErrorInputNotValid');
		}

		return inputData[0] === '/' ? inputData : '/'.concat(inputData);
	},

	_ZDRModelSyncCallbackSignatures() {
		return [
			'ZDRSchemaDispatchSyncCreate',
			'ZDRSchemaDispatchSyncUpdate',
			'ZDRSchemaDispatchSyncDelete',
			'ZDRSchemaDispatchSyncConflict',
		];
	},

	_ZDRModelSyncCallbackInput(param1, param2) {
		if (!mod._ZDRModelSyncCallbackSignatures().includes(param1)) {
			throw new Error('ZDRErrorInputNotValid');
		}

		if (!param2.origin) {
			throw new Error('ZDRErrorInputNotValid');
		}

		if (param1 === 'ZDRSchemaDispatchSyncConflict') {
			return param2;
		}

		return param2[param1 === 'ZDRSchemaDispatchSyncDelete' ? 'oldValue' : 'newValue'];
	},

	_ZDRModelSyncCallbackSignature(inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return;
		}

		if (inputData.origin === 'remote' && typeof inputData.oldValue === 'undefined' && typeof inputData.newValue !== 'undefined') {
			return 'ZDRSchemaDispatchSyncCreate';
		}

		if (inputData.origin === 'remote' && typeof inputData.oldValue !== 'undefined' && typeof inputData.newValue !== 'undefined') {
			return 'ZDRSchemaDispatchSyncUpdate';
		}

		if (inputData.origin === 'remote' && typeof inputData.oldValue !== 'undefined' && typeof inputData.newValue === 'undefined') {
			return 'ZDRSchemaDispatchSyncDelete';
		}

		if (inputData.origin === 'conflict') {
			return 'ZDRSchemaDispatchSyncConflict';
		}

		return;
	},

	_ZDRFissionObjectFilter(inputData) {
		if (typeof inputData !== 'string') {
			return false;
		}

		return ['{}', '[]'].includes(inputData[0] + inputData.slice(-1));
	},

	ZDRProtocolRemoteStorage() {
		return 'ZDR_PROTOCOL_REMOTE_STORAGE';
	},

	ZDRProtocolFission() {
		return 'ZDR_PROTOCOL_FISSION';
	},

	ZDRProtocolCustom() {
		return 'ZDR_PROTOCOL_CUSTOM';
	},

	_ZDRProtocols() {
		return [
			mod.ZDRProtocolRemoteStorage(),
			mod.ZDRProtocolFission(),
			mod.ZDRProtocolCustom(),
		];
	},

	ZDRProtocolForIdentity(inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('ZDRErrorInputNotValid');
		}

		return inputData.match('fission.codes') ? mod.ZDRProtocolFission() : mod.ZDRProtocolRemoteStorage();
	},

	_ZDRProtocol(inputData) {
		if (typeof inputData === 'function' && Object.keys(inputData).includes('Authorize')) {
			return mod.ZDRProtocolRemoteStorage();
		}

		if (!!inputData && typeof inputData === 'object' && Object.keys(inputData).includes('Scenario')) {
			return mod.ZDRProtocolFission();
		}

		if (!!inputData && typeof inputData === 'object' && inputData.ZDRClientWriteFile && mod._ZDRClientObjectValidate(inputData)) {
			return mod.ZDRProtocolCustom();
		}

		throw new Error('ZDRErrorInputNotValid');
	},

	_ZDRClientInterface(_client, protocol, options) {
		return {

			async ClientWriteFile(param1, param2, param3) {
				await ({
					[mod.ZDRProtocolRemoteStorage()]: (async function () {
						return _client.storeFile(param3, param1, typeof Blob !== 'undefined' && param2.constructor === Blob ? await new Promise(function (res, rej) {
							const reader = new FileReader();

							reader.onload = function () {
								res(reader.result);
							};

							reader.readAsArrayBuffer(param2);
						}) : param2);
					}),
					[mod.ZDRProtocolFission()]: (function () {
						return _client().write(param1, param2).then(function () {
							return _client().publish();
						});
					}),
					[mod.ZDRProtocolCustom()]: (function () {
						return _client.ZDRClientWriteFile(param1, param2, param3);
					}),
				})[protocol]();

				return param2;
			},

			async ClientWriteObject(param1, param2) {
				const _this = this;
				const writeData = JSON.stringify(options._ZDRParamDispatchPreObjectWrite ? options._ZDRParamDispatchPreObjectWrite(param2) : param2);

				await _this.ClientWriteFile(param1, writeData, 'application/json');

				return param2;
			},

			ClientReadFile(inputData) {
				return ({
					[mod.ZDRProtocolRemoteStorage()]: (async function () {
						return ((await _client.getFile(inputData, false)) || {}).data;
					}),
					[mod.ZDRProtocolFission()]: (function () {
						return _client().cat(inputData);
					}),
					[mod.ZDRProtocolCustom()]: (function () {
						return _client.ZDRClientReadFile(inputData);
					}),
				})[protocol]();
			},

			async ClientReadObject(inputData) {
				const result = await this.ClientReadFile(inputData);
				return result ? JSON.parse(result) : null;
			},

			async ClientListObjects(inputData) {
				return (await ({
					[mod.ZDRProtocolRemoteStorage()]: (async function () {
						return Object.entries(await _client.getAll(inputData, false)).filter(function ([key, value]) {
							if (mod._ZDRPathIsDirectory(key)) {
								return false;
							}

							return value !== true;
						});
					}),
					[mod.ZDRProtocolFission()]: (async function () {
						return (await Promise.all(Object.entries(await _client().ls(inputData)).filter(function ([key, value]) {
							return value.isFile;
						}).map(async function ([key, value]) {
							return [key, await _client().cat(inputData + key)];
						}))).reduce(function (coll, [key, value]) {
							if (!mod._ZDRFissionObjectFilter(value)) {
								return coll;
							}

							try {
								return coll.concat([
									[key, JSON.parse(value)]
								]);
							} catch (error) {
								return coll;
							}
						}, []);
					}),
					[mod.ZDRProtocolCustom()]: (async function () {
						return Object.entries(await _client.ZDRClientListObjects(inputData));
					}),
				})[protocol]()).reduce(function (coll, [key, value]) {
					return Object.assign(coll, {
						[key]: value,
					});
				}, {});
			},

			async ClientPaths(inputData) {
				return await ({
					[mod.ZDRProtocolRemoteStorage()]: (async function () {
						return Object.keys(await _client.getListing(inputData, false));
					}),
					[mod.ZDRProtocolFission()]: (async function () {
						if (!(await _client().exists(inputData))) {
							return [];
						}

						return Object.entries(await _client().ls(inputData)).map(function ([key, value]) {
							return key + (!value.isFile ? '/' : '');
						});
					}),
					[mod.ZDRProtocolCustom()]: (async function () {
						return Object.keys(await _client.ZDRClientListObjects(inputData));
					}),
				})[protocol]();
			},

			ClientDelete(inputData) {
				return ({
					[mod.ZDRProtocolRemoteStorage()]: (function () {
						if (mod._ZDRPathIsDirectory(inputData)) {
							return null;
						}
						
						return _client.remove(inputData.replace(/^\/+/, ''));
					}),
					[mod.ZDRProtocolFission()]: (function () {
						return _client().rm(inputData).then(function () {
							return _client().publish();
						});
					}),
					[mod.ZDRProtocolCustom()]: (function () {
						return _client.ZDRClientDelete(inputData);
					}),
				})[protocol]();
			},

		};
	},

	_ZDRWrap(inputData) {
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

		if (typeof inputData.ZDRParamDispatchReady !== 'function') {
			throw new Error('ZDRErrorInputNotValid');
		}

		if (typeof inputData.ZDRParamDispatchError !== 'undefined') {
			if (typeof inputData.ZDRParamDispatchError !== 'function') {
				throw new Error('ZDRErrorInputNotValid');
			}
		}

		if (typeof inputData.ZDRParamDispatchConnected !== 'undefined') {
			if (typeof inputData.ZDRParamDispatchConnected !== 'function') {
				throw new Error('ZDRErrorInputNotValid');
			}
		}

		if (typeof inputData.ZDRParamDispatchOnline !== 'undefined') {
			if (typeof inputData.ZDRParamDispatchOnline !== 'function') {
				throw new Error('ZDRErrorInputNotValid');
			}
		}

		if (typeof inputData.ZDRParamDispatchOffline !== 'undefined') {
			if (typeof inputData.ZDRParamDispatchOffline !== 'function') {
				throw new Error('ZDRErrorInputNotValid');
			}
		}

		if (typeof inputData.ZDRParamDispatchSyncDidStart !== 'undefined') {
			if (typeof inputData.ZDRParamDispatchSyncDidStart !== 'function') {
				throw new Error('ZDRErrorInputNotValid');
			}
		}

		if (typeof inputData.ZDRParamDispatchSyncDidStop !== 'undefined') {
			if (typeof inputData.ZDRParamDispatchSyncDidStop !== 'function') {
				throw new Error('ZDRErrorInputNotValid');
			}
		}

		if (typeof inputData._ZDRParamDispatchPreObjectWrite !== 'undefined') {
			if (typeof inputData._ZDRParamDispatchPreObjectWrite !== 'function') {
				throw new Error('ZDRErrorInputNotValid');
			}
		}

		const library = (function () {
			if (ZDRStorageProtocol !== mod.ZDRProtocolRemoteStorage()) {
				return inputData.ZDRParamLibrary;
			}

			return new(inputData.ZDRParamLibrary)({
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
		})();

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

		let fissionClient = library._fs || {};
		(async function fissionSetup() {
			if (ZDRStorageProtocol !== mod.ZDRProtocolFission()) {
				return;
			}

			const state = await library.initialize(fissionPermissions);

			if (state.scenario === library.Scenario.AuthCancelled) {
				return library.redirectToLobby(state.permissions);
				return inputData.ZDRParamDispatchError && inputData.ZDRParamDispatchError(new Error('AuthorizationCancelled'));
			}

			if (state.scenario === library.Scenario.NotAuthorised) {
				return library.redirectToLobby(state.permissions);
			}

			if (![library.Scenario.AuthSucceeded, library.Scenario.Continuation].includes(state.scenario)) {
				// error?
				return;
			}

			if (!Object.keys(fissionClient).length) {
				fissionClient = state.fs;
			}

			await Promise.all(scopes.map(async function (e) {
				if (!(await fissionClient.exists(`/private/${ e.ZDRScopeDirectory }`))) {
					await fissionClient.mkdir(`/private/${ e.ZDRScopeDirectory }`);
					await fissionClient.publish();
				}
			}));

			inputData.ZDRParamDispatchConnected && inputData.ZDRParamDispatchConnected(state.username, Math.random().toString());

			inputData.ZDRParamDispatchReady();
		})();

		if (ZDRStorageProtocol === mod.ZDRProtocolRemoteStorage()) {
			library.on('error', function (error) {
				if (!library.remote.online && error.message === 'Sync failed: Network request failed.') {
					return;
				}

				inputData.ZDRParamDispatchError && inputData.ZDRParamDispatchError(error);
			});

			library.on('connected', function () {
				inputData.ZDRParamDispatchConnected && inputData.ZDRParamDispatchConnected(library.remote.userAddress, library.remote.token);
			});

			library.on('network-online', function () {
				inputData.ZDRParamDispatchOnline && inputData.ZDRParamDispatchOnline();
			});

			library.on('network-offline', function () {
				inputData.ZDRParamDispatchOffline && inputData.ZDRParamDispatchOffline();
			});

			library.on('sync-done', function () {
				inputData.ZDRParamDispatchSyncDidStop && inputData.ZDRParamDispatchSyncDidStop();
			});

			library.on('ready', function () {
				inputData.ZDRParamDispatchReady();
			});
		}

		if (ZDRStorageProtocol === mod.ZDRProtocolCustom()) {
			Promise.resolve((library.ZDRClientPrepare || function () {})()).then(inputData.ZDRParamDispatchReady);
		}

		const outputData = {

			ZDRStorageProtocol,

			ZDRStorageClient() {
				return ({
					[mod.ZDRProtocolRemoteStorage()]: (function () {
						return library;
					}),
					[mod.ZDRProtocolFission()]: (function () {
						return fissionClient;
					}),
				})[ZDRStorageProtocol]();
			},

			ZDRCloudConnect(inputData) {
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
					[mod.ZDRProtocolCustom()]: (function () {
						return library.ZDRClientConnect(inputData);
					}),
				})[ZDRStorageProtocol]();
			},

			ZDRCloudReconnect() {
				return ({
					[mod.ZDRProtocolRemoteStorage()]: (function () {
						return library.reconnect(inputData);
					}),
					[mod.ZDRProtocolFission()]: (function () {
						return library.initialize(fissionPermissions);
					}),
					[mod.ZDRProtocolCustom()]: (function () {
						return !library.ZDRClientReconnect ? library.ZDRClientConnect() : library.ZDRClientReconnect();
					}),
				})[ZDRStorageProtocol]();
			},

			ZDRCloudDisconnect() {
				return ({
					[mod.ZDRProtocolRemoteStorage()]: (function () {
						return library.disconnect(inputData);
					}),
					[mod.ZDRProtocolFission()]: (function () {
						return library.leave({
							withoutRedirect: true,
						});
					}),
					[mod.ZDRProtocolCustom()]: (function () {
						return library.ZDRClientDisconnect(inputData);
					}),
				})[ZDRStorageProtocol]();
			},

		};

		return scopes.reduce(function (coll, item) {
			if (ZDRStorageProtocol === mod.ZDRProtocolRemoteStorage()) {
				library.access.claim(item.ZDRScopeDirectory, 'rw');

				library.caching.enable(`/${ item.ZDRScopeDirectory }/`);
			}

			const schemas = (item.ZDRScopeSchemas || []).filter(mod._ZDRSchemaObjectValidate);

			const _client = {
				[mod.ZDRProtocolRemoteStorage()]: (function () {
					return library[item.ZDRScopeDirectory].privateClient;
				}),
				[mod.ZDRProtocolFission()]: (function () {
					return function () {
						return fissionClient;
					};
				}),
				[mod.ZDRProtocolCustom()]: (function () {
					return library;
				}),
			}[ZDRStorageProtocol]();
			const client = mod._ZDRClientInterface(_client, ZDRStorageProtocol, inputData);

			if (ZDRStorageProtocol === mod.ZDRProtocolRemoteStorage() && schemas.filter(function (e) {
					return Object.keys(e).filter(function (e) {
						return mod._ZDRModelSyncCallbackSignatures().includes(e);
					}).length;
				}).length) {
				_client.on('change', function (event) {
					const signature = mod._ZDRModelSyncCallbackSignature(event);

					if (!signature) {
						return;
					}

					schemas.forEach(function (e) {
						if (e.ZDRSchemaPath(e.ZDRSchemaStub(event.relativePath)) !== event.relativePath) {
							return;
						}

						if (!e[signature]) {
							return;
						}

						return e[signature](mod._ZDRModelSyncCallbackInput(signature, event));
					});
				});
			}

			const scopePath = function (inputData) {
				return ((ZDRStorageProtocol === mod.ZDRProtocolFission() ? `/private/${ item.ZDRScopeCreatorDirectory ? `Apps/${ item.ZDRScopeCreatorDirectory }/${ item.ZDRScopeDirectory }` : item.ZDRScopeDirectory }/` : '') + inputData).split('//').join('/').slice(ZDRStorageProtocol === mod.ZDRProtocolRemoteStorage() && inputData[0] === '/' ? 1 : 0);
			};

			return Object.assign(coll, {
				[item.ZDRScopeKey]: Object.assign({

					_ZDRStorageBasePath: scopePath,

					ZDRStorageWriteFile(param1, param2, param3) {
						if (typeof param1 !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						if (typeof param3 !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						return client.ClientWriteFile(scopePath(param1), param2, param3);
					},

					ZDRStorageWriteObject(param1, param2) {
						if (typeof param1 !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						if (typeof param2 !== 'object' || param2 === null) {
							throw new Error('ZDRErrorInputNotValid');
						}

						return client.ClientWriteObject(scopePath(param1), param2);
					},

					ZDRStorageReadFile(inputData) {
						if (typeof inputData !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						return client.ClientReadFile(scopePath(inputData));
					},

					ZDRStorageReadObject(inputData) {
						if (typeof inputData !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						return client.ClientReadObject(scopePath(inputData));
					},

					ZDRStorageListObjects(inputData) {
						if (typeof inputData !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						return client.ClientListObjects(scopePath(inputData));
					},

					_ZDRStoragePaths(inputData) {
						return client.ClientPaths(scopePath(inputData));
					},

					ZDRStoragePaths(inputData) {
						if (typeof inputData !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						return this._ZDRStoragePaths(mod._ZDRPathFormatDirectory(inputData));
					},

					async _ZDRStoragePathsRecursive(inputData, includeFolders = false) {
						const _this = this;
						return uFlatten(await Promise.all((await _this.ZDRStoragePaths(inputData)).map(function (e) {
							return mod._ZDRPathIsDirectory(e) ? _this._ZDRStoragePathsRecursive(inputData + e, includeFolders) : inputData + e;
						}))).concat(includeFolders ? inputData : []);
					},

					ZDRStoragePathsRecursive(inputData, includeFolders = false) {
						if (typeof inputData !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						if (typeof includeFolders !== 'undefined') {
							if (typeof includeFolders !== 'boolean') {
								throw new Error('ZDRErrorInputNotValid');
							}
						}

						return this._ZDRStoragePathsRecursive(mod._ZDRPathFormatDirectory(inputData), includeFolders);
					},

					_ZDRStorageDeleteFile(inputData) {
						return client.ClientDelete(inputData);
					},

					ZDRStorageDeleteFile(inputData) {
						if (typeof inputData !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						return client.ClientDelete(scopePath(inputData));
					},

					async ZDRStorageDeleteFolderRecursive(inputData) {
						if (typeof inputData !== 'string') {
							throw new Error('ZDRErrorInputNotValid');
						}

						const _this = this._ZDRStoragePathsRecursive ? this : coll[item.ZDRScopeKey];

						await Promise.all((await _this._ZDRStoragePathsRecursive(mod._ZDRPathFormatDirectory(inputData))).map(scopePath).map(_this._ZDRStorageDeleteFile));

						return inputData;
					},

				}, schemas.reduce(function (map, model) {
					return Object.assign(map, {
						[model.ZDRSchemaKey]: Object.assign({

							ZDRModelPath(inputData) {
								if (typeof inputData !== 'object' || inputData === null) {
									throw new Error('ZDRErrorInputNotValid');
								}

								return model.ZDRSchemaPath(...arguments);
							},

							ZDRModelWriteObject(inputData) {
								if (model.ZDRSchemaDispatchValidate) {
									const outputData = model.ZDRSchemaDispatchValidate(...arguments);

									if (outputData) {
										return Promise.reject(outputData);
									}
								}

								return coll[item.ZDRScopeKey].ZDRStorageWriteObject(map[model.ZDRSchemaKey].ZDRModelPath(...arguments), inputData);
							},

							async _ZDRModelListObjects() {
								const _this = this;

								return (await coll[item.ZDRScopeKey].ZDRStoragePathsRecursive('/')).filter(function (e) {
									return mod._ZDRPathFormatPath(e) === mod._ZDRPathFormatPath(_this.ZDRModelPath(model.ZDRSchemaStub(e)));
								});
							},

							async ZDRModelListObjects() {
								return Promise.all((await this._ZDRModelListObjects()).map(coll[item.ZDRScopeKey].ZDRStorageReadObject));
							},

							ZDRModelDeleteObject(inputData) {
								return coll[item.ZDRScopeKey].ZDRStorageDeleteFile(map[model.ZDRSchemaKey].ZDRModelPath(inputData));
							},

						}, Object.entries(model.ZDRSchemaMethods || {}).reduce(function (coll, [key, value]) {
							if (typeof value !== 'function') {
								throw new Error('ZDRErrorInputNotFunction');
							}

							return Object.assign(coll, {
								[key]: value.bind(outputData),
							});
						}, {})),
					});
				}, {})),
			});
		}, outputData);
	},

	ZDRWrap(inputData = {}) {
		const _this = this;
		return new Promise(async function (res, rej) {
			try {
				const outputData = _this._ZDRWrap(Object.assign(inputData, {
					ZDRParamDispatchReady: (function () {
						setTimeout(function () {
							return res(outputData);
						});
					}),
				}));
			} catch (error) {
				rej(error);
			}
		});
	},

	ZDRPreferenceProtocol(inputData, _localStorage) {
		if (!mod._ZDRProtocols().includes(inputData)) {
			throw new Error('ZDRErrorInputNotValid');
		}

		const api = typeof localStorage === 'object' ? localStorage : _localStorage;
		if (!api.getItem('ZDR_PREFERENCE_PROTOCOL')) {
			api.setItem('ZDR_PREFERENCE_PROTOCOL', inputData);
		}

		return api.getItem('ZDR_PREFERENCE_PROTOCOL');
	},

	ZDRPreferenceProtocolClear(_localStorage) {
		return (typeof localStorage === 'object' ? localStorage : _localStorage).removeItem('ZDR_PREFERENCE_PROTOCOL');
	},

	ZDRPreferenceProtocolMigrate(_localStorage) {
		return (typeof localStorage === 'object' ? localStorage : _localStorage).getItem('ZDR_PREFERENCE_PROTOCOL_MIGRATE');
	},

	ZDRPreferenceProtocolMigrateClear(_localStorage) {
		return (typeof localStorage === 'object' ? localStorage : _localStorage).removeItem('ZDR_PREFERENCE_PROTOCOL_MIGRATE');
	},

	ZDRPreferenceProtocolConnect(inputData, _localStorage) {
		const protocol = this.ZDRProtocolForIdentity(inputData);

		const api = typeof localStorage === 'object' ? localStorage : _localStorage;

		if (api.getItem('ZDR_PREFERENCE_PROTOCOL') && (api.getItem('ZDR_PREFERENCE_PROTOCOL') !== protocol)) {
			api.setItem('ZDR_PREFERENCE_PROTOCOL_MIGRATE', api.getItem('ZDR_PREFERENCE_PROTOCOL'));
		}

		api.setItem('ZDR_PREFERENCE_PROTOCOL', protocol);

		return protocol;
	},

	ZDRLauncherFakeItemProxy() {
		return {
			LCHRecipeName: 'ZDRLauncherFakeItemProxy',
			LCHRecipeCallback() {},
		};
	},

	ZDRLauncherItemFakeDispatchError(inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		return {
			LCHRecipeName: 'ZDRLauncherItemFakeDispatchError',
			LCHRecipeCallback() {
				return inputData.ZDRParamDispatchError(new Error('ZDR_FAKE_CLOUD_ERROR'));
			},
		};
	},

	ZDRLauncherItemFakeDispatchConnected(inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		return {
			LCHRecipeName: 'ZDRLauncherItemFakeDispatchConnected',
			LCHRecipeCallback() {
				return inputData.ZDRParamDispatchConnected('ZDR_FAKE_CLOUD_IDENTITY');
			},
		};
	},

	ZDRLauncherItemFakeDispatchOnline(inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		return {
			LCHRecipeName: 'ZDRLauncherItemFakeDispatchOnline',
			LCHRecipeCallback() {
				return inputData.ZDRParamDispatchOnline();
			},
		};
	},

	ZDRLauncherItemFakeDispatchOffline(inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		return {
			LCHRecipeName: 'ZDRLauncherItemFakeDispatchOffline',
			LCHRecipeCallback() {
				return inputData.ZDRParamDispatchOffline();
			},
		};
	},

	ZDRLauncherItemFakeDispatchSyncDidStart(inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		return {
			LCHRecipeName: 'ZDRLauncherItemFakeDispatchSyncDidStart',
			LCHRecipeCallback() {
				return inputData.ZDRParamDispatchSyncDidStart();
			},
		};
	},

	ZDRLauncherItemFakeDispatchSyncDidStop(inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		return {
			LCHRecipeName: 'ZDRLauncherItemFakeDispatchSyncDidStop',
			LCHRecipeCallback() {
				return inputData.ZDRParamDispatchSyncDidStop();
			},
		};
	},

	ZDRLauncherItemFakeDispatchDisconnected(inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		return {
			LCHRecipeName: 'ZDRLauncherItemFakeDispatchDisconnected',
			LCHRecipeCallback() {
				return inputData.ZDRParamDispatchConnected(null);
			},
		};
	},

	ZDRRecipes(params) {
		if (typeof params !== 'object' || params === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.ParamMod !== 'object' || params.ParamMod === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.ParamSpecUI !== 'boolean') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return [
			mod.ZDRLauncherFakeItemProxy(),
			mod.ZDRLauncherItemFakeDispatchError(params.ParamMod),
			mod.ZDRLauncherItemFakeDispatchConnected(params.ParamMod),
			mod.ZDRLauncherItemFakeDispatchOnline(params.ParamMod),
			mod.ZDRLauncherItemFakeDispatchOffline(params.ParamMod),
			mod.ZDRLauncherItemFakeDispatchSyncDidStart(params.ParamMod),
			mod.ZDRLauncherItemFakeDispatchSyncDidStop(params.ParamMod),
			mod.ZDRLauncherItemFakeDispatchDisconnected(params.ParamMod),
		].filter(function (e) {
			if (params.ParamSpecUI) {
				return true;
			}

			return !(e.LCHRecipeSignature || e.LCHRecipeName).match(/Fake/);
		});
	},

};

Object.assign(exports, mod);
