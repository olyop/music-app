/* eslint-disable no-lonely-if */
import isNull from "lodash/isNull"
import isEmpty from "lodash/isEmpty"

import { Artist, Genre, Album } from "../types"

const canSubmitArtists = (artists: Artist[]) => artists.reduce(
	(submit, { name, photo }) => (isNull(photo) || isEmpty(name) ? false : submit),
	true,
)

const canSubmitGenres = (genres: Genre[]) => genres.reduce(
	(submit, { name }) => (isEmpty(name) ? false : submit),
	true,
)

export const canSubmit = (artists: Artist[], genres: Genre[], albums: Album[]) =>
	!isEmpty(albums) &&
	canSubmitGenres(genres) &&
	canSubmitArtists(artists)