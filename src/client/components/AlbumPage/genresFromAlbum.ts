import uniq from "lodash/uniq"
import pipe from "@oly_op/pipe"
import flattenDepth from "lodash/flattenDepth"

import { Album, Genre } from "../../types"

const genresFromAlbum = (album: Album): Genre[] =>
	pipe(
		({ songs }: Album) => songs,
		songs => songs.map(({ genres }) => genres),
		songs => flattenDepth(songs, 2),
		uniq,
	)(album)

export default genresFromAlbum