from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs
from io import BytesIO

__all__= [
    "parse_auth_code",
    "HTTPRequest",
    "path_to_query_str"
]

class HTTPRequest(BaseHTTPRequestHandler):
    def __init__(self, request_text):
        self.rfile = BytesIO(request_text)
        self.raw_requestline = self.rfile.readline()
        self.error_code = self.error_message = None
        self.parse_request()

    def send_error(self, code, message):
        self.error_code = code
        self.error_message = message


def parse_auth_code (pathstring):
    querystring = path_to_query_str(pathstring)
    querydict = dict(parse_qs(querystring))

    if querydict["code"]:
        return querydict["code"]
    else:
        return querydict["error"]


def path_to_query_str (pathstring):
    querystring = pathstring.split("?", 1)[1]
    return querystring