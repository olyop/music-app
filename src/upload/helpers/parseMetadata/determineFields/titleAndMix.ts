import { IAudioMetadata } from "music-metadata-browser"

const indexOfBracket = (str: string) =>
	str.indexOf("(")

const hasBracket = (str: string) =>
	str.includes("(")

export const determineMix = ({ common: { title } }: IAudioMetadata) => {
	if (title) {
		if (title.includes("Original")) {
			return "Original"
		} else if (title.includes("Extended")) {
			return "Extended"
		} else {
			return ""
		}
	} else {
		return ""
	}
}

export const determineTitle = ({ common: { title } }: IAudioMetadata) => {
	if (title) {
		if (hasBracket(title)) {
			return title.slice(0, indexOfBracket(title) - 1)
		} else {
			return title
		}
	} else {
		return "Untitled"
	}
}