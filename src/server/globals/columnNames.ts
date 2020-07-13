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

export const USER = [
	"user_id",
	"name",
	"email",
	"current",
	"date_created",
]

export const SONG = [
	"song_id",
	"title",
	"mix",
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