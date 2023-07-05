const http = require('https');
const querystring = require('querystring');
const crypto = require("crypto");

rapi = module.exports;
rapi.api_url = "api.reactioon.com";
rapi.api_port = "1357";
rapi.api_key = "";
rapi.api_secret = "";

rapi.Load = function(apiKey, apiSecret) {

    rapi.api_key = apiKey;
    rapi.api_secret = apiSecret;

    return rapi

}

rapi.Request = function(method, path, content) {
    
    return new Promise(async function(resolve, reject){

        var post_data = querystring.stringify(content)

        console.log(post_data);

        // headers = {
        //     'content-type':'application/x-www-form-urlencoded',
        //     'X-RTN-KEY' : 'x',
        //     'X-RTN-SECRET' : 'y'
        // };

        const signature = crypto.createHmac("sha256", rapi.api_secret).update(post_data, "utf-8").digest("hex");

        headers = {};
        headers["X-RTN-KEY"] = rapi.api_key;
        headers["X-RTN-SIGNATURE"] = signature;

        if (method == "POST") {
            
            headers["Content-Type"] = "application/x-www-form-urlencoded";
            headers["Content-Length"] = Buffer.byteLength(post_data);

        }

        console.log(headers);

        var opts = {
            host: rapi.api_url,
            port: rapi.api_port,
            path: "/" + path,
            method: method,
            headers: headers,
            rejectUnauthorized: false
        };

        console.log(opts);

        var req = http.request(opts, function(res) {

            var str = '';
            
            res.setEncoding('utf8');
            
            res.on('data', function (chunk) {
                str += chunk;
                // resolve(chunk)
            });

            res.on('end', function () {
                resolve(str)
            });

        });

        // post the data
        if (method == "POST") {
            req.write(post_data);
        }

        req.end();

    });

}