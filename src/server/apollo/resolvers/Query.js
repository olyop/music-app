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
  await sql({
    query: SELECT_SONGS,
    parse: parseSqlTable,
  })

const albums = async () =>
  await sql({
    query: SELECT_ALBUMS,
    parse: parseSqlTable,
  })

const genres = async () =>
  await sql({
    query: SELECT_GENRES,
    parse: parseSqlTable,
  })

const artists = async () =>
  await sql({
    query: SELECT_ARTISTS,
    parse: parseSqlTable,
  })

const playlists = async () =>
  await sql({
    query: SELECT_PLAYLISTS,
    parse: parseSqlTable,
  })

const user = async ({ args }) =>
  await sql({
    query: SELECT_USER,
    parse: parseSqlRow,
    args: { userId: args.userId },
  })

const play = async ({ args }) =>
  await sql({
    query: SELECT_PLAY,
    parse: parseSqlRow,
    args: { playId: args.playId },
  })

const song = async ({ args }) =>
  await sql({
    query: SELECT_SONG,
    parse: parseSqlRow,
    args: { songId: args.songId },
  })

const album = async ({ args }) =>
  await sql({
    query: SELECT_ALBUM,
    parse: parseSqlRow,
    args: { albumId: args.albumId },
  })

const genre = async ({ args }) =>
  await sql({
    query: SELECT_GENRE,
    parse: parseSqlRow,
    args: { genreId: args.genreId },
  })

const artist = async ({ args }) =>
  await sql({
    query: SELECT_ARTIST,
    parse: parseSqlRow,
    args: { artistId: args.artistId },
  })

const playlist = async ({ args }) =>
  await sql({
    query: SELECT_PLAYLIST,
    parse: parseSqlRow,
    args: { playlistId: args.playlistId },
  })

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
