import importSql from "../importSql"

const importFile = importSql("selects")

export const SELECT_PLAY = importFile("play")
export const SELECT_SONG = importFile("song")
export const SELECT_USER = importFile("user")
export const SELECT_ALBUM = importFile("album")
export const SELECT_GENRE = importFile("genre")
export const SELECT_SONGS = importFile("songs")
export const SELECT_GENRES = importFile("genres")
export const SELECT_ALBUMS = importFile("albums")
export const SELECT_ARTIST = importFile("artist")
export const SELECT_ARTISTS = importFile("artists")
export const SELECT_PLAYLIST = importFile("playlist")
export const SELECT_USER_DOCS = importFile("userDocs")
export const SELECT_PLAYLISTS = importFile("playlists")
export const SELECT_USER_QUEUE = importFile("userQueue")
export const SELECT_SEARCH_DOC = importFile("searchDoc")
export const SELECT_NEW_ALBUMS = importFile("newAlbums")
export const SELECT_USER_PLAYS = importFile("userPlays")
export const SELECT_ALBUM_SONGS = importFile("albumSongs")
export const SELECT_GENRE_SONGS = importFile("genreSongs")
export const SELECT_SONG_GENRES = importFile("songGenres")
export const SELECT_ARTIST_PLAYS = importFile("artistPlays")
export const SELECT_ARTIST_SONGS = importFile("artistSongs")
export const SELECT_SONG_ARTISTS = importFile("songArtists")
export const SELECT_ALBUM_GENRES = importFile("albumGenres")
export const SELECT_TOP_TEN_SONGS = importFile("topTenSongs")
export const SELECT_ALBUM_ARTISTS = importFile("albumArtists")
export const SELECT_ARTIST_ALBUMS = importFile("artistAlbums")
export const SELECT_SONG_REMIXERS = importFile("songRemixers")
export const SELECT_USER_DOC_PLAYS = importFile("userDocPlays")
export const SELECT_USER_DOC_ADDED = importFile("userDocAdded")
export const SELECT_USER_DOC_IN_LIB = importFile("userDocInLib")
export const SELECT_PLAYLIST_SONGS = importFile("playlistSongs")
export const SELECT_SONG_FEATURING = importFile("songFeaturing")
export const SELECT_USER_ALBUM_PLAYS = importFile("userAlbumPlays")
export const SELECT_USER_QUEUE_SONGS = importFile("userQueueSongs")

export const SELECT_SONG_SEARCH = importFile("songSearch")
export const SELECT_GENRE_SEARCH = importFile("genreSearch")
export const SELECT_ALBUM_SEARCH = importFile("albumSearch")
export const SELECT_ARTIST_SEARCH = importFile("artistSearch")