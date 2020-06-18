/* eslint-disable quote-props */
import { ImgDim } from "../types"

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
	next: 1,
	queue: 1,
	current: 1,
}

export const IMAGE_SIZES = {
	ALBUM: {
		HALF: [400, 400] as ImgDim,
		FULL: [800, 800] as ImgDim,
	},
	ARTIST: {
		MINI: [640, 360] as ImgDim,
		HALF: [1280, 720] as ImgDim,
		FULL: [1920, 1080] as ImgDim,
	},
}

export const NIL_UUID =
	"00000000-0000-0000-0000-000000000000"

export const EMPTY_DATA_URL =
	"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="