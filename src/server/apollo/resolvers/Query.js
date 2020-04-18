import {
  SELECT_SONG,
  SELECT_ALBUM,
  SELECT_GENRE,
  SELECT_ALBUMS,
  SELECT_PLAYLIST,
  SELECT_SONGS,
  SELECT_ARTIST,
  SELECT_GENRES,
  SELECT_ARTISTS,
  SELECT_PLAYLISTS,
} from "../../sql/index.js"

import complexQueries from "./complexQueries/index.js"

import { sql } from "../../database/pg.js"
import mapValues from "lodash/mapValues.js"
import { resolver } from "../../helpers/index.js"
import { parseSqlRow, parseSqlTable } from "../../helpers/index.js"

const songs = async () =>
  parseSqlTable(await sql(SELECT_SONGS))

const albums = async () =>
  parseSqlTable(await sql(SELECT_ALBUMS))

const genres = async () =>
  parseSqlTable(await sql(SELECT_GENRES))

const artists = async () =>
  parseSqlTable(await sql(SELECT_ARTISTS))

const playlists = async () =>
  parseSqlTable(await sql(SELECT_PLAYLISTS))

const user = async ({ args }) =>
  parseSqlRow(await sql(SELECT_USER, { userId: args.userId }))

const play = async ({ args }) =>
  parseSqlRow(await sql(SELECT_PLAY, { playId: args.playId }))

const song = async ({ args }) =>
  parseSqlRow(await sql(SELECT_SONG, { songId: args.songId }))

const album = async ({ args }) =>
  parseSqlRow(await sql(SELECT_ALBUM, { albumId: args.albumId }))

const genre = async ({ args }) =>
  parseSqlRow(await sql(SELECT_GENRE, { genreId: args.genreId }))

const artist = async ({ args }) =>
  parseSqlRow(await sql(SELECT_ARTIST, { artistId: args.artistId }))

const playlist = async ({ args }) =>
  parseSqlRow(await sql(SELECT_PLAYLIST, { playlistId: args.playlistId }))

const queryResolver = {
  user,
  play,
  song,
  songs,
  album,
  genre,
  albums,
  genres,
  artist,
  artists,
  playlist,
  playlists,
  ...complexQueries,
}

export default mapValues(queryResolver, resolver)
