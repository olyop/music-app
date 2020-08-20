import {
	Song,
	Genre,
	Album,
	Artist,
	SQLConfig,
} from "../../../../types"

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
} from "../../../../sql"

import { sql } from "../../../../helpers"
import { COLUMN_NAMES } from "../../../../globals"

export const insertGenre = (genreId: string, genre: GenreInput): SQLConfig<Genre> => ({
	sql: INSERT_GENRE,
	parse: sql.parseRow(),
	variables: [{
		key: "genreId",
		value: genreId,
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

export const insertArtist = (artistId: string, artist: ArtistUpload): SQLConfig<Artist> => ({
	sql: INSERT_ARTIST,
	parse: sql.parseRow(),
	variables: [{
		key: "artistId",
		value: artistId,
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

export const insertAlbum = (albumId: string, album: AlbumUpload): SQLConfig<Album> => ({
	sql: INSERT_ALBUM,
	parse: sql.parseRow(),
	variables: [{
		key: "albumId",
		value: albumId,
	},{
		key: "title",
		value: album.title,
		parameterized: true,
	},{
		string: false,
		key: "columnNames",
		value: sql.join(COLUMN_NAMES.ALBUM),
	},{
		string: false,
		key: "released",
		value: album.released.toString(),
	}],
})

export const insertAlbumArtist =
	(albumId: string) =>
		(artistId: string, index: number): SQLConfig<Artist> => ({
			sql: INSERT_ALBUM_ARTIST,
			variables: [{
				key: "albumId",
				value: albumId,
			},{
				key: "artistId",
				value: artistId,
			},{
				key: "index",
				string: false,
				value: index.toString(),
			}],
		})

export const insertSong =
	(songId: string, duration: number, song: SongUpload): SQLConfig<Song> => ({
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
			value: songId,
		},{
			key: "albumId",
			value: song.album,
		},{
			string: false,
			key: "duration",
			value: duration.toString(),
		},{
			string: false,
			key: "discNumber",
			value: song.discNumber.toString(),
		},{
			string: false,
			key: "trackNumber",
			value: song.trackNumber.toString(),
		},{
			string: false,
			key: "columnNames",
			value: sql.join(COLUMN_NAMES.SONG),
		}],
	})

export const insertSongGenre =
	(songId: string) => (genreId: string, index: number): SQLConfig<Genre> => ({
		sql: INSERT_SONG_GENRE,
		variables: [{
			key: "songId",
			value: songId,
		},{
			key: "genreId",
			value: genreId,
		},{
			key: "index",
			string: false,
			value: index.toString(),
		}],
	})

export const insertSongArtist =
	(songId: string) => (artistId: string, index: number): SQLConfig<Artist> => ({
		sql: INSERT_SONG_ARTIST,
		variables: [{
			key: "songId",
			value: songId,
		},{
			key: "artistId",
			value: artistId,
		},{
			key: "index",
			string: false,
			value: index.toString(),
		}],
	})

export const insertSongRemixer =
	(songId: string) => (artistId: string, index: number): SQLConfig<Artist> => ({
		sql: INSERT_SONG_REMIXER,
		variables: [{
			key: "songId",
			value: songId,
		},{
			key: "artistId",
			value: artistId,
		},{
			key: "index",
			string: false,
			value: index.toString(),
		}],
	})

export const insertSongFeaturer =
	(songId: string) => (artistId: string, index: number): SQLConfig<Artist> => ({
		sql: INSERT_SONG_FEAT,
		variables: [{
			key: "songId",
			value: songId,
		},{
			key: "artistId",
			value: artistId,
		},{
			key: "index",
			string: false,
			value: index.toString(),
		}],
	})