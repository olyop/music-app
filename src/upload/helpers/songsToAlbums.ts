import partition from "lodash/partition"

import { Song } from "../types"

export const songsToAlbums = (songs: Song) =>
	partition(songs, "album.title")