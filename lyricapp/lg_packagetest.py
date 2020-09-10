import lyricsgenius



genius = lyricsgenius.Genius("RTg0Rc35PsaeBR2FUyTWxA2fttjlZ4iZZFKgI3TkIsokIfZH-eFScaPz8Icnd4VM")
artist = genius.search_artist("Andy Shauf", max_songs=3, sort="title")
print(artist.songs)
