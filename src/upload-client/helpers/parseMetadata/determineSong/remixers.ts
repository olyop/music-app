import type { ICommonTagsResult } from "music-metadata"

import {
	splitList,
	removeMix,
	strHasBrackets,
	strFindBrackets,
} from "./common"

export const determineRemixers = ({ title }: ICommonTagsResult) => {
	if (title) {
		if (strHasBrackets(title)) {
			const brackets = strFindBrackets(title)
			if (brackets.includes("Remix")) {
				const list = brackets.slice(0, brackets.lastIndexOf("Remix") - 1)
				return splitList(removeMix(list))
			} else {
				return []
			}
		} else {
			return []
		}
	} else {
		return []
	}
}