export const genre = [
	"genre_id",
	"name",
]

export const artist = [
	"artist_id",
	"name",
]

export const play = [
	"play_id",
	"date_created",
]

export const album = [
	"album_id",
	"title",
	"released",
]

export const user = [
	"user_id",
	"name",
	"email",
	"current",
	"date_created",
]

export const song = [
	"song_id",
	"title",
	"mix",
	"album_id",
	"duration",
	"disc_number",
	"track_number",
]

export const user_song = [
	"user_id",
	"song_id",
	"in_library",
	"date_created",
]

export const user_album = [
	"user_id",
	"album_id",
	"in_library",
	"date_created",
]

export const user_genre = [
	"user_id",
	"genre_id",
	"in_library",
	"date_created",
]

export const user_artist = [
	"user_id",
	"artist_id",
	"in_library",
	"date_created",
]