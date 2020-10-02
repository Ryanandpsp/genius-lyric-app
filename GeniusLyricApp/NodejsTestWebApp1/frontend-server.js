var http = require('http');
var url = require('url');

var port = process.env.PORT || 8080;
const authServer = process.env.AUTH_SERVER_ADDRESS;

var server = http.createServer(function (req, res) {
    var requrl = new URL(req.url, `http://${req.headers.host}`);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    if (requrl.pathname === "/login") {
        //redirect to spotify for authorization
        res.writeHead(301, { Location: authServer+"/authorize" });
        res.end();
    }

    if (requrl.pathname === "/current") {
        //redirect to spotify for authorization
        let urlparams = requrl.searchParams;
        let accessToken = urlparams.get("access_token");
        let refreshToken = urlparams.get("refresh_token");
        console.log(accessToken);
        res.end();
    }
    res.end('Hello World\n');
});