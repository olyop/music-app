/* eslint-disable no-lonely-if */
import isNull from "lodash/isNull"
import isEmpty from "lodash/isEmpty"

import { Artist, Genre, Album } from "../types"

const canSubmitArtists = (artists: Artist[]) => artists.reduce(
	(submit, { name, photo }) => {
		if (isNull(photo) || isEmpty(name)) {
			return false
		} else {
			return submit
		}
	},
	true,
)

const canSubmitGenres = (genres: Genre[]) => genres.reduce(
	(submit, { name }) => {
		if (isEmpty(name)) {
			return false
		} else {
			return submit
		}
	},
	true,
)

export const canSubmit = (artists: Artist[], genres: Genre[], albums: Album[]) => {
	if (isEmpty(albums)) {
		return false
	} else {
		if (canSubmitArtists(artists) && canSubmitGenres(genres)) {
			return true
		} else {
			return false
		}
	}
}