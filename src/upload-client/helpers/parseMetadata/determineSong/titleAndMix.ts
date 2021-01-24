import type { ICommonTagsResult } from "music-metadata"

import { strHasBrackets, strFindBrackets } from "./common"

export const determineMix = ({ title }: ICommonTagsResult) => {
	if (title) {
		if (title.includes("Extended")) {
			return "Extended"
		} else if (title.includes("Original")) {
			return "Original"
		} else {
			return ""
		}
	} else {
		return ""
	}
}

export const determineTitle = ({ title }: ICommonTagsResult) => {
	if (title) {
		if (strHasBrackets(title)) {
			const brackets = strFindBrackets(title)
			if (brackets.includes("Extended") ||
					brackets.includes("Remix") ||
					brackets.includes("Original")) {
				return title.slice(0, title.indexOf(brackets) - 2)
			} else {
				return title
			}
		} else {
			return title
		}
	} else {
		return ""
	}
}