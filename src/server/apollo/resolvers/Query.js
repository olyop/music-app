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

import mapValues from "lodash/mapValues.js"
import sqlQuery from "../../helpers/sql/sqlQuery.js"
import complexQueries from "./complexQueries/index.js"
import resolver from "../../helpers/utilities/resolver.js"
import sqlParseRow from "../../helpers/sql/sqlParseRow.js"
import sqlParseTable from "../../helpers/sql/sqlParseTable.js"

const songs = async () =>
  sqlQuery({
    query: SELECT_SONGS,
    parse: sqlParseTable,
  })

const albums = async () =>
  sqlQuery({
    query: SELECT_ALBUMS,
    parse: sqlParseTable,
  })

const genres = async () =>
  sqlQuery({
    query: SELECT_GENRES,
    parse: sqlParseTable,
  })

const artists = async () =>
  sqlQuery({
    query: SELECT_ARTISTS,
    parse: sqlParseTable,
  })

const playlists = async () =>
  sqlQuery({
    query: SELECT_PLAYLISTS,
    parse: sqlParseTable,
  })

const user = async ({ args }) =>
  sqlQuery({
    query: SELECT_USER,
    parse: sqlParseRow,
    variables: [{
      key: "userId",
      value: args.userId,
    }],
  })

const play = async ({ args }) =>
  sqlQuery({
    query: SELECT_PLAY,
    parse: sqlParseRow,
    variables: [{
      key: "playId",
      value: args.playId,
    }],
  })

const song = async ({ args }) =>
  sqlQuery({
    query: SELECT_SONG,
    parse: sqlParseRow,
    variables: [{
      key: "songId",
      value: args.songId,
    }],
  })

const album = async ({ args }) =>
  sqlQuery({
    query: SELECT_ALBUM,
    parse: parseSqlRow,
    variables: [{
      key: "albumId",
      value: args.albumId,
    }],
  })

const genre = async ({ args }) =>
  sqlQuery({
    query: SELECT_GENRE,
    parse: sqlParseRow,
    variables: [{
      key: "genreId",
      value: args.genreId,
    }],
  })

const artist = async ({ args }) =>
  sqlQuery({
    query: SELECT_ARTIST,
    parse: sqlParseRow,
    variables: [{
      key: "artistId",
      value: args.artistId,
    }],
  })

const playlist = async ({ args }) =>
  sqlQuery({
    query: SELECT_PLAYLIST,
    parse: sqlParseRow,
    variables: [{
      key: "playlistId",
      value: args.playlistId,
    }],
  })

const queryResolver = mapValues(
  {
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
  },
  resolver,
)

export default queryResolver
