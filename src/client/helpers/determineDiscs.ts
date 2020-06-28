import { isEmpty } from "lodash"

import { Song, Disc } from "../types"

export const determineDiscs = (songs: Song[]): Disc[] => {
	if (isEmpty(songs)) {
		return []
	} else {
		const numOfDiscs = songs[songs.length - 1].discNumber || 1
		const discs = Array(numOfDiscs).fill({})
		return discs.map(
			(_, index) => ({
				number: index + 1,
				songs: songs.filter(({ discNumber }) => discNumber === index + 1),
			}),
		)
	}
}