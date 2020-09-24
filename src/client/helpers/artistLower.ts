import isUndefined from "lodash/isUndefined"

import { Artist } from "../types"
import { determinePlural } from "./determinePlural"

export const artistLower = ({ songsTotal, albumsTotal }: Artist) => {
	if (isUndefined(songsTotal) || isUndefined(albumsTotal)) return undefined
	const albumsText = `${albumsTotal} album${determinePlural(albumsTotal)}`
	const songsText = `${songsTotal} song${determinePlural(songsTotal)}`
	return `${albumsText}, ${songsText}`
}