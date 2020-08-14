import find from "lodash/find"
import uniqueId from "lodash/uniqueId"

import { SongParsed } from "./types"
import { Album } from "../../types"

export const songsToAlbums = (songs: SongParsed[]) =>
	songs.reduce<Album[]>(
		(albums, song): Album[] => {
			const { title } = song.album
			if (find(albums, { title })) {
				return albums.map(
					album => (
						album.title === title ? {
							...album,
							songs: [
								...album.songs,
								{ ...song, songId: uniqueId() },
							],
						} : album
					),
				)
			} else {
				return [
					...albums,
					{
						...song.album,
						songs: [{
							...song,
							songId: uniqueId(),
						}],
						albumId: uniqueId(),
					},
				]
			}
		},
		[],
	)