import { isEmpty, last } from "lodash"

import { Song, Disc } from "../types"

export const determineDiscs = (songs: Song[]): Disc[] => {
	if (isEmpty(songs)) return []
	const numOfDiscs = last(songs)?.discNumber || 1
	const discs = Array(numOfDiscs).fill({})
	return discs.map(
		(_, index) => ({
			number: index + 1,
			songs: songs.filter(({ discNumber }) => discNumber === index + 1),
		}),
	)
}