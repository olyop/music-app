import find from "lodash/find"
import uniqueId from "lodash/uniqueId"

import { SongParsed } from "./types"
import { Album } from "../../types"

export const songsToAlbums = (songs: SongParsed[]) =>
	songs.reduce<Album[]>(
		(albums, songWithAlbum): Album[] => {
			const { album: albumTemp, ...song } = songWithAlbum
			const { title } = albumTemp
			if (find(albums, { title })) {
				return albums.map(
					album => (
						album.title === title ? {
							...album,
							songs: [
								...album.songs,
								{
									...song,
									songId: uniqueId(),
								},
							],
						} : album
					),
				)
			} else {
				return [
					...albums,
					{
						...albumTemp,
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