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

export const KEYS: Omit<Key, "keyId">[] = [{
	flat: "A",
	sharp: "A",
	camelot: "6B",
},{
	flat: "Am",
	sharp: "Am",
	camelot: "8A",
},{
	flat: "Bb",
	sharp: "A#",
	camelot: "6B",
},{
	flat: "Bbm",
	sharp: "A#m",
	camelot: "3A",
},{
	flat: "B",
	sharp: "B",
	camelot: "1B",
},{
	flat: "Bm",
	sharp: "Bm",
	camelot: "10A",
},{
	flat: "C",
	sharp: "C",
	camelot: "8B",
},{
	flat: "Cm",
	sharp: "Cm",
	camelot: "5A",
},{
	flat: "Db",
	sharp: "C#",
	camelot: "3B",
},{
	flat: "Dbm",
	sharp: "C#m",
	camelot: "12A",
},{
	flat: "D",
	sharp: "D",
	camelot: "10B",
},{
	flat: "Dm",
	sharp: "Dm",
	camelot: "7A",
},{
	flat: "Eb",
	sharp: "D#",
	camelot: "5B",
},{
	flat: "Ebm",
	sharp: "D#m",
	camelot: "2A",
},{
	flat: "E",
	sharp: "E",
	camelot: "12B",
},{
	flat: "Em",
	sharp: "Em",
	camelot: "9A",
},{
	flat: "F",
	sharp: "F",
	camelot: "7B",
},{
	flat: "Fm",
	sharp: "Fm",
	camelot: "4A",
},{
	flat: "Gb",
	sharp: "F#",
	camelot: "2B",
},{
	flat: "Gbm",
	sharp: "F#m",
	camelot: "11A",
},{
	flat: "G",
	sharp: "G",
	camelot: "9B",
},{
	flat: "Gm",
	sharp: "Gm",
	camelot: "6A",
},{
	flat: "Ab",
	sharp: "G#",
	camelot: "4B",
},{
	flat: "Abm",
	sharp: "G#m",
	camelot: "1A",
}]