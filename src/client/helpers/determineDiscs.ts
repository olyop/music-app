import isEmpty from "lodash/isEmpty"

import { Song, Disc } from "../types"

export const determineDiscs =
	(songs: Song[]): Disc[] => {
		if (isEmpty(songs)) {
			return []
		} else {
			const numOfDiscs = songs[songs.length - 1].discNumber || 1
			const discsEmpty = Array(numOfDiscs).fill({})
			const discs = discsEmpty.map(
				(_, index) => ({
					hideLabel: false,
					number: index + 1,
					songs: songs.filter(({ discNumber }) => discNumber === index + 1),
				}),
			)
			if (discs.length === 1) {
				return discs.map(disc => ({ ...disc, hideLabel: true }))
			} else {
				return discs
			}
		}
	}