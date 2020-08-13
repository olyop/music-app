import type { ICommonTagsResult } from "music-metadata"

import { splitList } from "./common"

export const determineFeaturing = ({ artist }: ICommonTagsResult) => {
	if (artist) {
		if (artist.includes("feat.")) {
			const str = artist.slice(artist.indexOf("feat.") + 6, artist.length)
			return splitList(str)
		} else {
			return []
		}
	} else {
		return []
	}
}