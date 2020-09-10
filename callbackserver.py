import socket
import lyricapp.oauth2stuff
from http.server import BaseHTTPRequestHandler
from io import BytesIO
from urllib.parse import parse_qs
import sys


# use socket to listen to authorization callback
listen_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_address = ("localhost", 5050)
listen_sock.bind(server_address)

listen_sock.listen(1)
while True:
    # wait for connection
    connection, client_address = listen_sock.accept()

    try:
        rawrequeststring = connection.recv(4096)
        request = HTTPRequest, (rawrequeststring)
        print(parse_auth_code(request.path))

    finally:
        connection.close()
