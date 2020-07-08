import map from "lodash/fp/map"
import uniq from "lodash/fp/uniq"
import { pipe } from "@oly_op/pipe"
import flatten from "lodash/fp/flatten"

import { Album } from "../../../types"

const determineAlbumArtists = (album: Album) =>
	album.artists.map(({ val }) => val)

const determineSongArtists = songs =>
	pipe(songs)(
		map(({ artists, remixers, featuring }) => [
			...artists,
			...remixers,
			...featuring,
		]),
		flatten,
		map(({ val }) => val),
	)

const determineArtists = (album, songs) => uniq([
	...determineSongArtists(songs),
	...determineAlbumArtists(album),
])

export default determineArtists