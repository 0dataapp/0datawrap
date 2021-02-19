<a href="https://0data.app"><img src="https://rosano.s3.amazonaws.com/public/0data/identity.svg" width="64"></a>

# Zero Data Wrap

_Unified JavaScript API for Fission + remoteStorage._

# API Guide

## Setup

```javascript
const api = await zerodatawrap.ZDRWrap({

  // include then pass directly
  ZDRParamLibrary: RemoteStorage, // or webnative

  // read/write permissions
  ZDRParamScopes: [{

    // code-level identifier
    ZDRScopeKey: 'alfa',

    // top-level storage directory
    ZDRScopeDirectory: 'bravo',

  }],
  
});

// ready

// write `{"foo":"bar"}` to /bravo/charlie.json
await api.alfa.ZDRStorageWriteObject('charlie.json', {
  foo: 'bar',
});
```

### ZDRWrap

| param | type | notes |
|-------|---------|-------|
| ZDRParamLibrary <br> **Required** | pass `RemoteStorage` or `webnative` or an object conforming to `ZDRClient` | |
| ZDRParamScopes <br> **Required** | array of `ZDRScope` objects | |
| ZDRParamDispatchError | function | called on network or sync errors |

### ZDRScope

| param | type | notes |
|-------|---------|-------|
| ZDRScopeKey <br> **Required** | string, non-empty, trimmed | convenience accessor for code only |
| ZDRScopeDirectory <br> **Required** | string, non-empty, trimmed | top-level directory for claiming read/write access |
| ZDRScopeCreatorDirectory | string, non-empty, trimmed | if Fission, sets `permissions.app` instead of `permissions.fs` |
| ZDRScopeSchemas | array of `ZDRSchema` objects | defines model helpers |

### ZDRClient (for custom storage only)

| function | notes |
|-------|---------|
| ZDRClientWriteFile <br> **Required** | called by `ZDRStorageWriteFile` |
| ZDRClientReadFile <br> **Required** | called by `ZDRStorageReadFile` |
| ZDRClientListObjects <br> **Required** | called by `ZDRStorageListObjects` |
| ZDRClientDelete <br> **Required** | called by `ZDRStorageDelete` |
| ZDRClientPrepare | called before returning wrapper |
| ZDRClientConnect | called by `ZDRCloudConnect` |
| ZDRClientReconnect | called by `ZDRCloudReconnect` |
| ZDRClientDisconnect | called by `ZDRCloudDisconnect` |

## Storage

### ZDRStorageWriteObject(path, object)

Call `JSON.stringify`; write to storage.

Returns input object.

### ZDRStorageWriteFile(path, data, mimetype)

*`mimetype` used by remoteStorage.*

Write to storage.

Returns input data.

### ZDRStorageReadObject(path)

Read from storage; call `JSON.parse`.

Returns object.

### ZDRStorageReadFile(path)

Read from storage.

Returns data.

### ZDRStorageListObjects(path)

Read from storage in path directory (non-recursive); group by path.

Returns key/value object.

### ZDRStoragePaths(path)

Fetch paths (non-recursive).

Returns array of paths.

### ZDRStoragePathsRecursive(path)

Fetch paths recursively.

Returns flat array of paths.

### ZDRStorageDelete(path)

Delete from storage.

Returns null.

**Note: Deleting folders directly is valid in Fission and invalid in remoteStorage**

## Cloud

### ZDRCloudConnect(address)

Start authorization process corresponding to `ZDRParamLibrary`.

Returns boolean.

### ZDRCloudDisconnect()

Log out.

Returns undefined.

## Model (optional)

```javascript
const api = zerodatawrap.ZDRWrap({

  // …

  ZDRParamScopes: [{

    // …

    // map schemas to paths
    ZDRScopeSchemas: [{

      // code-level identifier
      ZDRSchemaKey: 'cars',

      // path for a given object
      ZDRSchemaPath (object) {
        return `cars/${ object.id }.json`;
      },

      // object information for a given path
      ZDRSchemaStub (path) {
        return {
          id: path.split('/').pop().split('.json').shift(),
        };
      },

    }],

    // …

  }],
  
  // …

});

// write `{"id":"batmobile"}` to "/bravo/cars/batmobile.json
await api.alfa.cars.ZDRModelWriteObject({
  id: 'batmobile',
});
```

### ZDRSchema

| param | type | notes |
|-------|---------|-------|
| ZDRSchemaKey <br> **Required** | string, non-empty, trimmed | convenience accessor for code only |
| ZDRSchemaPath <br> **Required** | function | constructs the path for a given object |
| ZDRSchemaStub <br> **Required** | function | constructs object information for a given path, used for filtering paths in recursion and routing sync events |
| ZDRSchemaMethods | object | defines methods to be accessed from the api interface (bound to `this`) |
| ZDRSchemaDispatchValidate | function | called before `ZDRModelWriteObject` |
| ZDRSchemaDispatchSyncCreate | function | called on remote create *remoteStorage only* |
| ZDRSchemaDispatchSyncUpdate | function | called on remote update *remoteStorage only* |
| ZDRSchemaDispatchSyncDelete | function | called on remote delete *remoteStorage only* |
| ZDRSchemaDispatchSyncConflict | function | called on remote conflict *remoteStorage only* <br> **Note: this passes the remoteStorage change event directly** |

### Specify a validation function

```javascript
const api = zerodatawrap.ZDRWrap({

  // …

  ZDRParamScopes: [{

    // …

    ZDRScopeSchemas: [{

      // …

      // truthy values cause a promise rejection
      ZDRSchemaDispatchValidate (object) {
        if (typeof object.id !== 'string') {
          return {
            not: 'so fast',
          };
        }
      },

      // …

    }],

    // …

  }],

  // …

});

// rejects
try {
  await api.alfa.cars.ZDRModelWriteObject({
    id: 123,
  });
} catch (truthy) {
  console.log(truthy.not); // so fast
}
```

### Specify custom methods

```javascript
const api = zerodatawrap.ZDRWrap({

  // …

  ZDRParamScopes: [{

    // …

    ZDRScopeSchemas: [{

      // …

      // logic to be done on save
      ZDRSchemaMethods: {

        clean (car) {
          return this.alfa.cars.ZDRModelWriteObject(Object.assign(car, {
            clean: true,
            washed: new Date(),
          }));
        },

      },

      // …

    }],

    // …

  }],

  // …

});

// write `{"id":"batmobile","clean":true,"washed":"…"}` to "/bravo/cars/batmobile.json
await api.alfa.cars.clean({
  id: 'batmobile',
});
```

### Receive object sync notifications

```javascript
const api = zerodatawrap.ZDRWrap({

  // …

  ZDRParamScopes: [{

    // …

    ZDRScopeSchemas: [{

      // …

      // update the interface for remote changes
      ZDRSchemaDispatchSyncCreate (object) {
        console.log('create', object);
      },
      ZDRSchemaDispatchSyncUpdate (object) {
        console.log('update', object);
      },
      ZDRSchemaDispatchSyncDelete (object) {
        console.log('delete', object);
      },

      // handle conflict
      ZDRSchemaDispatchSyncConflict (event) {
        console.log('conflict', event);
      },

      // …

    }],

    // …

  }],

  // …

});
```

### ZDRModelPath(object)

Returns object path via `ZDRSchemaPath`.

### ZDRModelWriteObject(object)

Validate with `ZDRSchemaDispatchValidate`, reject if truthy; write object to path from `ZDRModelPath`.

Returns input data.

### ZDRModelListObjects()

Read all objects recursively (where paths conform to logic in `ZDRSchema`).

Returns array of objects.

### ZDRModelDeleteObject(object)

Delete object from storage.

Returns input.

# License

The code is released under a [Hippocratic License](https://firstdonoharm.dev), modified to exclude its use for surveillance capitalism and also to require large for-profit entities to purchase a paid license.

# Questions

Feel free to reach out on [Mastodon](https://merveilles.town/@rosano) or [Twitter](https://twitter.com/rosano).