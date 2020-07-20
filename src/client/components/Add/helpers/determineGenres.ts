import { pipe } from "@oly_op/pipe"
import { map, flatten, uniq } from "lodash/fp"

import { Doc, Song } from "../types"

const mapSongsGenres = (songs: Song[]) =>
	songs.map(({ genres }) => genres)

const mapVal = (genres: Doc[]) =>
	genres.map(({ val }) => val)

export const determineGenres = (songs: Song[]): Doc[] =>
	pipe(
		mapSongsGenres,
		flatten,
		mapVal,
		uniq,
	)(songs)