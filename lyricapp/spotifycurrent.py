from oauth2stuff import get_auth_url
import webbrowser
import os
import subprocess
import callbackserver

client_id = "8e8a7f221fa84c71a6c31e5eb830bea5"
# client_secret =
redirect_uri = "https://www.google.ca/"

scopeList = ["user-read-currently-playing", "user-read-playback-state"]

payload = {"client_id": "8e8a7f221fa84c71a6c31e5eb830bea5", "response_type": "code",
           "redirect_uri": "http://localhost:5050", "state": scopeList}

if __name__ == "__main__":
    webbrowser.open(get_auth_url(payload))
    callbackserver.start_server()
