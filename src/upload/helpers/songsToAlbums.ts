import find from "lodash/find"

import { Song, AlbumWithSongs } from "../types"

export const songsToAlbums = (songs: Song[]) =>
	songs.reduce(
		(albums: AlbumWithSongs[], song: Song): AlbumWithSongs[] => {
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
					{ ...song.album, songs: [song] },
				]
			}
		},
		[],
	)