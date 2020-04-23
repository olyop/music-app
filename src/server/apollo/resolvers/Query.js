import {
  SELECT_USER,
  SELECT_SONG,
  SELECT_PLAY,
  SELECT_ALBUM,
  SELECT_GENRE,
  SELECT_SONGS,
  SELECT_ALBUMS,
  SELECT_ARTIST,
  SELECT_GENRES,
  SELECT_ARTISTS,
  SELECT_PLAYLIST,
  SELECT_PLAYLISTS,
} from "../../sql/index.js"

import {
  resolver,
  parseSqlRow,
  parseSqlTable,
  queryDatabase,
} from "../../helpers/index.js"

import mapValues from "lodash/mapValues.js"
import complexQueries from "./complexQueries/index.js"

const songs = async () =>
  queryDatabase({
    query: SELECT_SONGS,
    parse: parseSqlTable,
  })

const albums = async () =>
  queryDatabase({
    query: SELECT_ALBUMS,
    parse: parseSqlTable,
  })

const genres = async () =>
  queryDatabase({
    query: SELECT_GENRES,
    parse: parseSqlTable,
  })

const artists = async () =>
  queryDatabase({
    query: SELECT_ARTISTS,
    parse: parseSqlTable,
  })

const playlists = async () =>
  queryDatabase({
    query: SELECT_PLAYLISTS,
    parse: parseSqlTable,
  })

const user = async ({ args }) =>
  queryDatabase({
    query: SELECT_USER,
    parse: parseSqlRow,
    args: { userId: args.userId },
  })

const play = async ({ args }) =>
  queryDatabase({
    query: SELECT_PLAY,
    parse: parseSqlRow,
    args: { playId: args.playId },
  })

const song = async ({ args }) =>
  queryDatabase({
    query: SELECT_SONG,
    parse: parseSqlRow,
    args: { songId: args.songId },
  })

const album = async ({ args }) =>
  queryDatabase({
    query: SELECT_ALBUM,
    parse: parseSqlRow,
    args: { albumId: args.albumId },
  })

const genre = async ({ args }) =>
  queryDatabase({
    query: SELECT_GENRE,
    parse: parseSqlRow,
    args: { genreId: args.genreId },
  })

const artist = async ({ args }) =>
  queryDatabase({
    query: SELECT_ARTIST,
    parse: parseSqlRow,
    args: { artistId: args.artistId },
  })

const playlist = async ({ args }) =>
  queryDatabase({
    query: SELECT_PLAYLIST,
    parse: parseSqlRow,
    args: { playlistId: args.playlistId },
  })

const queryResolver = mapValues({
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
}, resolver)

export default queryResolver
