import orderBy from "lodash/orderBy"
import { Song } from "../types"

export const orderSongs = (songs: Song[]) =>
	orderBy(songs, ["discNumber", "trackNumber"], ["asc", "asc"])