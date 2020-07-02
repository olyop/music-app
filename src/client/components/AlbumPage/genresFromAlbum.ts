import { uniq } from "lodash"
import { pipe } from "@oly_op/pipe"
import { map, flattenDepth } from "lodash/fp"

import { Album, Genre } from "../../types"

const genresFromAlbum = (album: Album): Genre[] =>
	pipe(
		({ songs }: Album) => songs,
		map(({ genres }) => genres),
		flattenDepth(2),
		uniq,
	)(album)

export default genresFromAlbum