<a href="https://0data.app"><img src="https://rosano.s3.amazonaws.com/public/0data/identity.svg" width="64"></a>

# Zero Data Wrap

_Unified JavaScript API for Fission + remoteStorage._

# API Guide

## Setup

```javascript
const api = zerodatawrap.ZDRWrap({

  // import the corresponding javascript library, then pass it directly
  ZDRParamLibrary: RemoteStorage, // or webnative

  // read/write permissions
  ZDRParamScopes: [{

    // code-level identifier
    ZDRScopeKey: 'alfa',

    // top-level storage directory
    ZDRScopeDirectory: 'bravo',
  }],
  
});

// write `{"foo":"bar"}` to /bravo/charlie.json
await api.alfa.ZDRStorageWriteObject('/charlie.json', {
  foo: 'bar',
});
```

### ZDRWrap

| param | type | notes |
|-------|---------|-------|
| ZDRParamLibrary — **Required** | pass `RemoteStorage` or `webnative` | |
| ZDRParamScopes — **Required** | array of `ZDRScope` objects | |
| ZDRParamReadyCallback | function | called when the library is prepared |
| ZDRParamErrorCallback | function | called on sync errors |

### ZDRScope

| param | type | notes |
|-------|---------|-------|
| ZDRScopeKey — **Required** | string, non-empty, trimmed | convenience accessor for code only |
| ZDRScopeDirectory — **Required** | string, non-empty, trimmed | top-level directory for claiming read/write access |
| ZDRScopeCreatorDirectory | string, non-empty, trimmed | used by Fission above the top-level directory |
| ZDRScopeSchemas | array of `ZDRSchema` objects | defines model helpers |

## Storage

### ZDRStorageWriteObject(path, object)

Call `JSON.stringify`; write to storage.

Returns input object.

### ZDRStorageWriteFile(path, data, mimetype)

Write to storage. Mimetype used by remoteStorage.

Returns input data.

### ZDRStorageReadObject(path, object)

Read from storage; call`JSON.parse`.

Returns input object.

### ZDRStorageReadFile(path, data, mimetype)

*`mimetype` used by remoteStorage.*

Read from storage.

Returns input data.

### ZDRStorageListObjects(path)

Read from storage in path directory (non-recursive); group by path.

Returns key/value object.

### ZDRStoragePaths(path)

List paths (non-recursive).

Returns array of paths.

### ZDRStoragePathsRecursive(path)

List paths recursively.

Returns flat array of paths.

### ZDRStorageDelete(path)

Delete from storage.

Returns null.

## Cloud

### ZDRCloudIsOnline()

Returns boolean.

### ZDRCloudConnect(address)

Start authorization process corresponding to `ZDRParamLibrary`.

Returns boolean.

### ZDRCloudDisconnect()

Log out.

Returns undefined.

## Model (optional)

```javascript
const api = zerodatawrap.ZDRWrap({

  // ...

  ZDRParamScopes: [{

    // ...

    // map schemas to paths
    ZDRScopeSchemas: [{

      // code-level identifier
      ZDRSchemaKey: 'cars',

      // path for a given object
      ZDRSchemaPathCallback (object) {
        return `/cars/${ object.id }.json`;
      },

      // object information for a given path
      ZDRSchemaStubCallback (path) {
        return {
          id: path.split('/').pop().split('.json').shift(),
        };
      },

    }],

    // ...

  }],
  
  // ...

});

// write `{"id":"batmobile"}` to "/bravo/cars/batmobile.json
await api.alfa.cars.ZDRModelWriteObject({
  id: 'batmobile',
});
```

### ZDRSchema

| param | type | notes |
|-------|---------|-------|
| ZDRSchemaKey – **Required** | string, non-empty, trimmed | convenience accessor for code only |
| ZDRSchemaPathCallback – **Required** | function | constructs the path for a given object |
| ZDRSchemaStubCallback – **Required** | function | constructs object information for a given path, used for routing sync events |
| ZDRSchemaMethods | object | defines methods to be accessed from the api interface (bound to `this`) |
| ZDRSchemaValidationCallback | function | called before `ZDRModelWriteObject` |
| ZDRSchemaSyncCallbackCreate | function | called on remote create |
| ZDRSchemaSyncCallbackUpdate | function | called on remote update |
| ZDRSchemaSyncCallbackDelete | function | called on remote delete |
| ZDRSchemaSyncCallbackConflict | function | called on remote conflict |

### Specify a validation function

```javascript
const api = zerodatawrap.ZDRWrap({

  // ...

  ZDRParamScopes: [{

    // ...

    ZDRScopeSchemas: [{

      // ...

      // path for a given object
      ZDRSchemaValidationCallback (object) {
        if (typeof object.id !== 'string') {
          return {
            not: 'so fast',
          }; // truthy values cause a promise rejection
        }
      },

      // ...

    }],

    // ...

  }],

  // ...

});

// rejects
try {
  await api.alfa.cars.ZDRModelWriteObject({
    id: 123,
  });
} catch (e) {
  console.log(e.not); // so fast
}
```

### Specify custom methods

```javascript
const api = zerodatawrap.ZDRWrap({

  // ...

  ZDRParamScopes: [{

    // ...

    ZDRScopeSchemas: [{

      // ...

      // logic to be done on save
      ZDRSchemaMethods: {

        clean (car) {
          return this.alfa.cars.ZDRModelWriteObject(Object.assign(car, {
            clean: true,
            washed: new Date(),
          }));
        },

      },

      // ...

    }],

    // ...

  }],

  // ...

});

// write `{"id":"batmobile","clean":true,"washed":"…"}` to "/bravo/cars/batmobile.json
await api.alfa.cars.clean({
  id: 'batmobile',
});
```

### Receive object sync notifications

```javascript
const api = zerodatawrap.ZDRWrap({

  // ...

  ZDRParamScopes: [{

    // ...

    ZDRScopeSchemas: [{

      // ...

      // update the interface for remote changes
      ZDRSchemaSyncCallbackCreate (object) {
        console.log('create', object);
      },
      ZDRSchemaSyncCallbackUpdate (object) {
        console.log('update', object);
      },
      ZDRSchemaSyncCallbackDelete (object) {
        console.log('delete', object);
      },

      // handle conflict
      ZDRSchemaSyncCallbackConflict (event) {
        console.log('conflict', event);
      },

      // ...

    }],

    // ...

  }],

  // ...

});
```

### ZDRModelPath(object)

Returns object path via `ZDRSchemaPathCallback`.

### ZDRStorageWriteObject(object)

Validate with `ZDRSchemaValidationCallback`, reject if truthy; write object to path from `ZDRModelPath`.

Returns input data.

### ZDRModelListObjects()

Read all objects recursively (where paths conform to logic in `ZDRSchema`).

Returns array of objects.

### ZDRModelDeleteObject(object)

Delete object from storage.

# License

The code is released under a [Hippocratic License](https://firstdonoharm.dev), modified to exclude its use for surveillance capitalism and also to require large for-profit entities to purchase a paid license.

# Questions

Feel free to reach out on [Mastodon](https://merveilles.town/@rosano) or [Twitter](https://twitter.com/rosano).