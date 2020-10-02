'use strict';
var http = require('http');
var url = require('url');
var rh = require("./request-handler");
const axios = require("axios"); 


var port = process.env.PORT || 1337;
var clientid = process.env.SPOTIFY_CLIENT_ID;
var scopeList = ["user-read-currently-playing", "user-read-playback-state"];
const frontendServer = process.env.FRONTEND_SERVER_ADDRESS;


var payload = {
    "client_id": clientid, "response_type": "code",
    "redirect_uri": "http://192.168.0.9:1337/callback", "state": scopeList
};
var AuthBaseUrl = "https://accounts.spotify.com/authorize?";


console.log(rh.getAuthUrl(payload, AuthBaseUrl).toString());



var server = http.createServer(function (req, res) {
    
    var requrl = new URL(req.url, `http://${req.headers.host}`);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    console.log(requrl.pathname);

    if (requrl.pathname === "/authorize") {
        //redirect to spotify for authorization
        res.writeHead(301, { Location: rh.getAuthUrl(payload, AuthBaseUrl).toString() });
        res.end();
    }

    else if (requrl.pathname === "/callback") {
        //get auth code and exchange for access token then redirect

        let urlparams = requrl.searchParams;
        let code = urlparams.get("code");

        //config for post request to get access token
        let config = {
            url: 'https://accounts.spotify.com/api/token',
            method: "post",
            params: {
                code: code,
                redirect_uri: "http://192.168.0.9:1337/callback",
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer.alloc(
                    process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
                ).toString('base64'))
            },
        };

        //post request
        axios(config).
            then(function (response) {
                //auto redirect to frontend server with access token
                let frontURL = new URL(frontendServer);
                frontURL.searchParams.append({
                    access_code: response.data.access_token,
                    refresh_token: response.data.refresh_token
                });
                
                res.writeHead(301, { Location:frontURL});
            })
            .catch(error => {
                console.error(error);
            })

        
        res.end('Redirecting\n');
    }
    else { res.end('Hello World\n');}
    
});

server.listen(port, () => {
    console.log(`Test app listening at http://localhost:${port}`)
});

