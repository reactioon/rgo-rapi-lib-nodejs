# RAPI Library / NodeJS

This is the official repository of the Reactioon API communication library for the NodeJS language.

## Focus
This library must aim some targets, see the list below:

1. Simple and easy to use.
2. Easy to maintain/upgrade.
3. Reusable

## Usage
You can use the library with one auth key, if you need use with multiples keys create an new instance of the class.

```js
async function Init() {

    var rapi = require('./rapi');
    r = rapi.Load("{reactioon-api-key}","{reactioon-api-secret}")

    // unique context
    r.Request("GET", "api/v2/bots/spot/all", {}).then(function(data){
        console.log("unique context:", data);
    });

    // reusable context
    d = await r.Request("GET", "api/v2/bots/spot/all", {});
    console.log("reusable context:", d);

}

Init()
```

## Considerations
This library is under development and may change over time. The integrity of existing methods will be maintained to avoid compatibility issues in the future.

## Contributions
You can contribute to the development of the ecosystem by helping to improve this library. Feel free to improve and submit your work with a pull request.


@author José Wilker <josewilker@reactioon.com>