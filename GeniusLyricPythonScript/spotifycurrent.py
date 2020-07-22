import requests
import urllib.parse as urlparse
import webbrowser

client_id = "8e8a7f221fa84c71a6c31e5eb830bea5"
# client_secret =
redirect_uri = "https://www.google.ca/"

payload = {"client_id": "8e8a7f221fa84c71a6c31e5eb830bea5",
           "response_type": "code",
           "redirect_uri": "https://www.google.ca/",
           "scope[]": ["user-read-currently-playing", "user-read-playback-state"]}
urlparam = urlparse.urlencode(payload)
authurl = "%s?%s" % ("https://accounts.spotify.com/authorize", urlparam)
webbrowser.open(authurl)
#response = requests.get("https://accounts.spotify.com/authorize")
print(authurl)
