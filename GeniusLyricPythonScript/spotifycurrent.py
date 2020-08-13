import requests
import urllib.parse as urlparse
import webbrowser



client_id = "8e8a7f221fa84c71a6c31e5eb830bea5"
# client_secret =
redirect_uri = "https://www.google.ca/"

scopeList = ["user-read-currently-playing", "user-read-playback-state"]

payload = {"client_id": "8e8a7f221fa84c71a6c31e5eb830bea5",
           "response_type": "code",
           "redirect_uri": "http://localhost:5050" }

payload["state"] = scopeList

def get_auth_url(payload):
    urlparam = urlparse.urlencode(payload)
    authurl = "%s?%s" % ("https://accounts.spotify.com/authorize", urlparam)
    return authurl


webbrowser.open(get_auth_url(payload))








