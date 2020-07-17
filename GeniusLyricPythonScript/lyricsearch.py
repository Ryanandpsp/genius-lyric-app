import lyricsgenius
import sys

def main(argv):
    song_title = argv[1]
    artist = argv[2]
    genius = lyricsgenius.Genius("RTg0Rc35PsaeBR2FUyTWxA2fttjlZ4iZZFKgI3TkIsokIfZH-eFScaPz8Icnd4VM")

    song = genius.search_song(song_title,artist)
    print(song.lyrics)
    return song.lyrics


if __name__=='__main__':
    main(sys.argv)
