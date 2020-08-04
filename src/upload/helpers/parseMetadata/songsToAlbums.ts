import find from "lodash/find"
import uniqueId from "lodash/uniqueId"

import { SongParsed, Album } from "../../types"

export const songsToAlbums = (songs: SongParsed[]) =>
	songs.reduce<Album[]>(
		(albums, song: SongParsed): Album[] => {
			const { title } = song.album
			if (find(albums, { title })) {
				return albums.map(
					album => (
						album.title === title ?
							{ ...album, songs: [ ...album.songs, song ] } : album
					),
				)
			} else {
				return [
					...albums,
					{
						...song.album,
						songs: [song],
						albumId: uniqueId(),
					},
				]
			}
		},
		[],
	)