var http = require('http');
var url = require('url');

var port = process.env.PORT || 8080;

var server = http.createServer(function (req, res) {
    console.log(req.url)
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
});