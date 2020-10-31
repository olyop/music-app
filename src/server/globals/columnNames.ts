export const GENRE = [
	"name",
	"genre_id",
]

export const ARTIST = [
	"name",
	"artist_id",
]

export const PLAY = [
	"play_id",
	"date_created",
]

export const ALBUM = [
	"album_id",
	"title",
	"released",
]

export const KEY = [
	"flat",
	"sharp",
	"key_id",
	"camelot",
]

export const USER = [
	"user_id",
	"name",
	"current",
	"date_joined",
]

export const SONG = [
	"mix",
	"bpm",
	"title",
	"key_id",
	"song_id",
	"album_id",
	"duration",
	"disc_number",
	"track_number",
]

export const PLAYLIST = [
	"playlist_id",
	"name",
	"user_id",
	"date_created",
]

export const USER_SONG = [
	"user_id",
	"song_id",
	"in_library",
	"date_added",
]

export const USER_ALBUM = [
	"user_id",
	"album_id",
	"in_library",
	"date_added",
]

export const USER_GENRE = [
	"user_id",
	"genre_id",
	"in_library",
	"date_added",
]

export const USER_ARTIST = [
	"user_id",
	"artist_id",
	"in_library",
	"date_added",
]

export const USER_QUEUE = [
	"user_id",
	"song_id",
	"index",
]