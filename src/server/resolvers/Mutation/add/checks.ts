import { PoolClient } from "pg"

import {
	sqlQuery,
	sqlExists,
	sqlIsUnique,
	getSqlResExists,
} from "../../../helpers"

import {
	Check,
	SongUpload,
	GenreInput,
	AlbumUpload,
	ArtistUpload,
} from "./types"

import { EXISTS_ALBUM_SONG } from "../../../sql"

type CheckFunc<T> =
	(client: PoolClient) => (doc: T, albumId?: string) => Check[]

export const genreChecks: CheckFunc<GenreInput> = client => genre => [
	{
		name: "isGenreTaken",
		check: sqlIsUnique(client)({
			column: "name",
			table: "genres",
			value: genre.name,
		}),
	},
]

export const artistChecks: CheckFunc<ArtistUpload> = client => artist => [
	{
		name: "isArtistTaken",
		check: sqlIsUnique(client)({
			column: "name",
			table: "artists",
			value: artist.name,
		}),
	},
]

export const albumChecks: CheckFunc<AlbumUpload> = client => album => [
	{
		name: "doArtistsExist",
		check: sqlExists(client)({
			table: "artists",
			column: "artist_id",
			value: album.artists,
		}),
	},
]

export const songChecks: CheckFunc<SongUpload> = client => (song, albumId) => [
	{
		name: "doGenresExist",
		check: sqlExists(client)({
			table: "genres",
			column: "genre_id",
			value: song.genres,
		}),
	},
	{
		name: "doesAlbumExist",
		check: sqlExists(client)({
			value: albumId!,
			table: "albums",
			column: "album_id",
		}),
	},
	{
		name: "doArtistsExist",
		check: sqlExists(client)({
			table: "artists",
			column: "artist_id",
			value: song.artists,
		}),
	},
	{
		name: "doRemixersExist",
		check: sqlExists(client)({
			table: "artists",
			column: "artist_id",
			value: song.remixers,
		}),
	},
	{
		name: "doFeaturingExist",
		check: sqlExists(client)({
			table: "artists",
			column: "artist_id",
			value: song.featuring,
		}),
	},
	{
		name: "isUniqueAlbumSong",
		check: sqlQuery(client)({
			sql: EXISTS_ALBUM_SONG,
			parse: res => !getSqlResExists(res),
			variables: [{
				key: "albumId",
				value: albumId!,
			},{
				string: false,
				key: "discNumber",
				value: song.discNumber,
			},{
				string: false,
				key: "trackNumber",
				value: song.trackNumber,
			}],
		}),
	},
]