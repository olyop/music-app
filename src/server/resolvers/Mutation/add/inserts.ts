import { v4 as uuid } from "uuid"

import {
	Song,
	Genre,
	Album,
	Artist,
	SqlConfig,
} from "../../../types"

import {
	SongUpload,
	GenreInput,
	AlbumUpload,
	ArtistUpload,
} from "./types"

import {
	INSERT_SONG,
	INSERT_GENRE,
	INSERT_ALBUM,
	INSERT_ARTIST,
	INSERT_SONG_FEAT,
	INSERT_SONG_GENRE,
	INSERT_SONG_ARTIST,
	INSERT_SONG_REMIXER,
	INSERT_ALBUM_ARTIST,
} from "../../../sql"

import { sql } from "../../../helpers"
import { COLUMN_NAMES } from "../../../globals"

export const insertGenre =
	(genre: GenreInput): SqlConfig<Genre> => ({
		sql: INSERT_GENRE,
		parse: sql.parseRow(),
		variables: [{
			value: uuid(),
			key: "genreId",
		},{
			key: "name",
			value: genre.name,
			parameterized: true,
		},{
			string: false,
			key: "columnNames",
			value: sql.join(COLUMN_NAMES.GENRE),
		}],
	})

export const insertArtist =
	(artist: ArtistUpload): SqlConfig<Artist> => ({
		sql: INSERT_ARTIST,
		parse: sql.parseRow(),
		variables: [{
			value: uuid(),
			key: "artistId",
		},{
			key: "name",
			value: artist.name,
			parameterized: true,
		},{
			string: false,
			key: "columnNames",
			value: sql.join(COLUMN_NAMES.ARTIST),
		}],
	})

export const insertAlbum =
	(album: AlbumUpload): SqlConfig<Album> => ({
		sql: INSERT_ALBUM,
		parse: sql.parseRow(),
		variables: [{
			value: uuid(),
			key: "albumId",
		},{
			key: "title",
			value: album.title,
			parameterized: true,
		},{
			string: false,
			key: "columnNames",
			value: sql.join(COLUMN_NAMES.ALBUM),
		},{
			key: "released",
			value: album.released.toISOString().slice(0, 10),
		}],
	})

export const insertAlbumArtist =
	(albumId: string) =>
		(artistId: string, index: number): SqlConfig<Artist> => ({
			sql: INSERT_ALBUM_ARTIST,
			variables: [{
				key: "albumId",
				value: albumId,
			},{
				key: "artistId",
				value: artistId,
			},{
				key: "index",
				value: index,
				string: false,
			}],
		})

export const insertSong =
	(song: SongUpload, albumId: string, duration: number): SqlConfig<Song> => ({
		sql: INSERT_SONG,
		parse: sql.parseRow(),
		variables: [{
			key: "mix",
			value: song.mix,
			parameterized: true,
		},{
			key: "title",
			value: song.title,
			parameterized: true,
		},{
			key: "songId",
			value: uuid(),
		},{
			key: "albumId",
			value: albumId,
		},{
			string: false,
			key: "duration",
			value: duration,
		},{
			string: false,
			key: "discNumber",
			value: song.discNumber,
		},{
			string: false,
			key: "trackNumber",
			value: song.trackNumber,
		},{
			string: false,
			key: "columnNames",
			value: sql.join(COLUMN_NAMES.SONG),
		}],
	})

export const insertSongGenre =
	(songId: string) => (genreId: string, index: number): SqlConfig<Genre> => ({
		sql: INSERT_SONG_GENRE,
		variables: [{
			key: "songId",
			value: songId,
		},{
			key: "genreId",
			value: genreId,
		},{
			key: "index",
			value: index,
			string: false,
		}],
	})

export const insertSongArtist =
	(songId: string) => (artistId: string, index: number): SqlConfig<Artist> => ({
		sql: INSERT_SONG_ARTIST,
		variables: [{
			key: "songId",
			value: songId,
		},{
			key: "artistId",
			value: artistId,
		},{
			key: "index",
			value: index,
			string: false,
		}],
	})

export const insertSongRemixer =
	(songId: string) => (artistId: string, index: number): SqlConfig<Artist> => ({
		sql: INSERT_SONG_REMIXER,
		variables: [{
			key: "songId",
			value: songId,
		},{
			key: "artistId",
			value: artistId,
		},{
			key: "index",
			value: index,
			string: false,
		}],
	})

export const insertSongFeaturer =
	(songId: string) => (artistId: string, index: number): SqlConfig<Artist> => ({
		sql: INSERT_SONG_FEAT,
		variables: [{
			key: "songId",
			value: songId,
		},{
			key: "artistId",
			value: artistId,
		},{
			key: "index",
			value: index,
			string: false,
		}],
	})