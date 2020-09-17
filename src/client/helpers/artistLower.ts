import isUndefined from "lodash/isUndefined"

import { Artist } from "../types"
import { determinePlural } from "./determinePlural"

export const artistLower = ({ numOfSongs, numOfAlbums }: Artist) => {
	if (isUndefined(numOfSongs) || isUndefined(numOfAlbums)) return undefined
	const albumsText = `${numOfAlbums} album${determinePlural(numOfAlbums)}`
	const songsText = `${numOfSongs} song${determinePlural(numOfSongs)}`
	return `${albumsText}, ${songsText}`
}