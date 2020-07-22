import { IAudioMetadata } from "music-metadata-browser"

const indexOfBracket = (str: string) =>
	str.indexOf("(")

const hasBracket = (str: string) =>
	str.includes("(")

const hasMix = (str: string) =>
	str.includes("Mix") || str.includes("Extended")

// const hasRemix = (str: string) =>
// 	str.includes("Remix") ||
// 	str.includes("Bootleg")

export const determineMix = () => {
	if (hasMix())
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