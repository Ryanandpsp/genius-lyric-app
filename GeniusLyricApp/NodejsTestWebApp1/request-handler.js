var http = require('http');
var url = require('url');

function getAuthUrl(dict, AuthBaseUrl) {
    var urlparam = new URLSearchParams(dict);
    var authurl = new URL(AuthBaseUrl);
    authurl.search = urlparam.toString();
    return authurl;
}

function requestHandler(req, res) {

}

exports.getAuthUrl = getAuthUrl;