/* eslint-disable quote-props */

process.setMaxListeners(20)

export const LOG_FORMAT =
	":status :url :total-time[0] ms"

export const GLOBAL_HTTP_HEADERS = {
	"Server": "Node.js",
	"Accept-Encoding": "gzip",
	"X-Powered-By": "Express",
	"X-Frame-Options": "deny",
}

export const SONG_ARTISTS_FIELDS = [
	"artists",
	"remixers",
	"featuring",
]

export const USER_EMPTY_QUEUE = {
	prev: [],
	next: [],
	queue: [],
	current: null,
}

export const USER_QUEUE_SELECT = {
	prev: 1,
	current: 1,
	next: 1,
	queue: 1,
}

export const IMAGE_SIZES = {
	ALBUM: {
		HALF: [400, 400],
		FULL: [800, 800],
	},
	ARTIST: {
		MINI: [640, 360],
		HALF: [1280, 720],
		FULL: [1920, 1080],
	},
}

export const NIL_UUID =
	"00000000-0000-0000-0000-000000000000"