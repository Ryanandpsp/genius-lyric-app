'use strict';
var http = require('http');
var url = require('url');
var request = require("request");
var rh = require("./request-handler");


var port = process.env.PORT || 1337;
var clientid = process.env.SPOTIFY_CLIENT_ID;
var scopeList = ["user-read-currently-playing", "user-read-playback-state"];
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
        res.writeHead(301, { Location: rh.getAuthUrl(payload, AuthBaseUrl).toString()});
        res.end();
    }

    else if (requrl.pathname === "/callback") {
        //get auth code and exchange for access token then redirect
        let urlparams = requrl.searchParams;
        let code = urlparams.get("code");
        console.log(code);
        let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: "http://192.168.0.9:1337/callback",
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(
                    process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
                ).toString('base64'))
            },
            json: true
        }
        
        request.post(authOptions, function (error, response, body) {
            var access_token = body.access_token;
            console.log(access_token);
        })
        
        res.end('Redirecting\n');
    }
    else { res.end('Hello World\n');}
    
});

server.listen(port, () => {
    console.log(`Test app listening at http://localhost:${port}`)
});

