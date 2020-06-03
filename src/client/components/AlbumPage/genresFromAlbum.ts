import { uniq } from "lodash"
import { map, flattenDepth } from "lodash/fp"

import { pipe } from "../../helpers"
import { Album, Genre } from "../../types"

const genresFromAlbum = (album: Album): Genre[] =>
	pipe(
		({ songs }: Album) => songs,
		map(({ genres }) => genres),
		flattenDepth(2),
		uniq,
	)(album)

export default genresFromAlbum