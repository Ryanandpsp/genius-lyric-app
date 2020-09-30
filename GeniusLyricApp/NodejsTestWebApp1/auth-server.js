'use strict';
var http = require('http');
var url = require('url');
var rh = require("./request-handler");

var port = process.env.PORT || 1337;
var clientid = process.env.SPOTIFY_CLIENT_ID;
var scopeList = ["user-read-currently-playing", "user-read-playback-state"];
var payload = {
    "client_id": clientid, "response_type": "code",
    "redirect_uri": "http://localhost:1337/callback/", "state": scopeList
};
var AuthBaseUrl = "https://accounts.spotify.com/authorize";


console.log(rh.getAuthUrl(payload, AuthBaseUrl).toString());

var server = http.createServer(function (req, res) {
    console.log(req.url)
    var requrl = new URL(req.url, `http://${req.headers.host}`);
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    if (requrl.pathname === "/authorize") {
        res.writeHead(301, { Location: 'rh.getAuthUrl(payload, AuthBaseUrl).toString()'});
    }
    else if (requrl.pathname === "/callback") {
        //get auth code and exchange for access token then redirect
        res.end('Redirecting\n');
    }
    else { res.end('Hello World\n');}
    
});

server.listen(port, () => {
    console.log(`Test app listening at http://localhost:${port}`)
});

