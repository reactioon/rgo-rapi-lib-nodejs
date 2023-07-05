
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