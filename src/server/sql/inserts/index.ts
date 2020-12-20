import importSql from "../importSql"

const importFile = importSql("inserts")

export const INSERT_SONG = importFile("song")
export const INSERT_PLAY = importFile("play")
export const INSERT_ALBUM = importFile("album")
export const INSERT_GENRE = importFile("genre")
export const INSERT_ARTIST = importFile("artist")
export const INSERT_USER_DOC = importFile("userDoc")
export const INSERT_PLAYLIST = importFile("playlist")
export const INSERT_SONG_FEAT = importFile("songFeat")
export const INSERT_SONG_GENRE = importFile("songGenre")
export const INSERT_USER_QUEUE = importFile("userQueue")
export const INSERT_SONG_ARTIST = importFile("songArtist")
export const INSERT_SONG_REMIXER = importFile("songRemixer")
export const INSERT_ALBUM_ARTIST = importFile("albumArtist")
export const INSERT_PLAYLIST_SONG = importFile("playlistSong")