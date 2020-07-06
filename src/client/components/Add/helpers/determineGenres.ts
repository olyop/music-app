import { pipe } from "@oly_op/pipe"
import { map, flatten, uniq } from "lodash/fp"

import { Song, Genre } from "../../../types"

const mapSongsGenres = (songs: Song[]) =>
	songs.map(({ genres }) => genres)

const mapVal = (genres: Genre[]) =>
	genres.map(({ val }) => val)

const determineGenres = (songs: Song[]): Genre[] =>
	pipe(
		mapSongsGenres,
		flatten,
		mapVal,
		uniq,
	)(songs)

export default determineGenres