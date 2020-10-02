var http = require('http');
var url = require('url');
var querystring = require('querystring')

function getAuthUrl(dict, AuthBaseUrl) {
    var urlparam = querystring.stringify(dict);
    var authurl = AuthBaseUrl + urlparam;
    return authurl;
}

function frontendRequestHandler(req, res) {
    
}

exports.getAuthUrl = getAuthUrl;