/* eslint-disable quote-props */
import { ImgDim, Key } from "../types"

export const GLOBAL_HTTP_HEADERS = {
	"Server": "Node.js",
	"Accept-Encoding": "gzip",
	"X-Powered-By": "Express",
	"X-Frame-Options": "deny",
}

export const LOG_FORMAT =
	":status :url :total-time[0] ms"

export const IMAGE_SIZES: Record<string, Record<string, ImgDim>> = {
	ALBUM: {
		HALF: [400, 400],
		FULL: [1000, 1000],
	},
	ARTIST: {
		MINI: [640, 360],
		HALF: [1280, 720],
		FULL: [1920, 1080],
	},
}