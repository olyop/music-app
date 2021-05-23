import { ImgDim } from "../types"

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