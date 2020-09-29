import socket
from oauth2stuff import *

import sys


def start_server():
    print('test')
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
            request = HTTPRequest(rawrequeststring)
            # this is the auth code
            print(parse_auth_code(request.path))

        finally:
            connection.close()


if __name__ == "__main__":
    start_server()
