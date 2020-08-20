import { PoolClient } from "pg"

import { sql } from "../../../helpers"
import { Check } from "../../../types"
import { EXISTS_ALBUM_SONG } from "../../../sql"
import { SongUpload, GenreInput, AlbumUpload, ArtistUpload } from "./types"

export const genreChecks = (client: PoolClient) => (genre: GenreInput): Check[] => [
	{
		name: "isGenreTaken",
		check: sql.unique(client)({
			column: "name",
			table: "genres",
			value: genre.name,
		}),
	},
]

export const artistChecks = (client: PoolClient) => (artist: ArtistUpload): Check[] => [
	{
		name: "isArtistTaken",
		check: sql.unique(client)({
			column: "name",
			table: "artists",
			value: artist.name,
		}),
	},
]

export const albumChecks = (client: PoolClient) => (album: AlbumUpload): Check[] => [
	{
		name: "isAlbumUnique",
		check: sql.unique(client)({
			table: "albums",
			column: "title",
			value: album.title,
		}),
	},{
		name: "doArtistsExist",
		check: sql.exists(client)({
			table: "artists",
			column: "artist_id",
			value: album.artists,
		}),
	},
]

export const songChecks = (client: PoolClient) => (song: SongUpload): Check[] => [
	{
		name: "isUniqueAlbumSong",
		check: sql.baseQuery(client)({
			sql: EXISTS_ALBUM_SONG,
			parse: res => !sql.resExists(res),
			variables: [{
				key: "albumId",
				value: song.album,
			},{
				string: false,
				key: "discNumber",
				value: song.discNumber.toString(),
			},{
				string: false,
				key: "trackNumber",
				value: song.trackNumber.toString(),
			}],
		}),
	},
	{
		name: "doGenresExist",
		check: sql.exists(client)({
			table: "genres",
			column: "genre_id",
			value: song.genres,
		}),
	},
	{
		name: "doesAlbumExist",
		check: sql.exists(client)({
			table: "albums",
			value: song.album,
			column: "album_id",
		}),
	},
	{
		name: "doArtistsExist",
		check: sql.exists(client)({
			table: "artists",
			column: "artist_id",
			value: song.artists,
		}),
	},
	{
		name: "doRemixersExist",
		check: sql.exists(client)({
			table: "artists",
			column: "artist_id",
			value: song.remixers,
		}),
	},
	{
		name: "doFeaturingExist",
		check: sql.exists(client)({
			table: "artists",
			column: "artist_id",
			value: song.featuring,
		}),
	},
]