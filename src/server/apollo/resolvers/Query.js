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
  SELECT_NEW_ALBUMS,
  SELECT_TOP_TEN_SONGS,
} from "../../sql/index.js"

import docSearch from "./common/docSearch.js"
import sqlJoin from "../../helpers/sql/sqlJoin.js"
import columnNames from "../../sql/columnNames.js"
import sqlQuery from "../../helpers/sql/sqlQuery.js"
import sqlParseRow from "../../helpers/sql/sqlParseRow.js"
import sqlParseTable from "../../helpers/sql/sqlParseTable.js"
import mapResolver from "../../helpers/utils/mapResolver.js"

const songs =
  async () =>
    sqlQuery({
      query: SELECT_SONGS,
      parse: sqlParseTable,
      variables: [{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.song, "songs"),
      }],
    })

const albums =
  async () =>
    sqlQuery({
      query: SELECT_ALBUMS,
      parse: sqlParseTable,
      variables: [{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.album),
      }],
    })

const genres =
  async () =>
    sqlQuery({
      query: SELECT_GENRES,
      parse: sqlParseTable,
      variables: [{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.genre),
      }],
    })

const artists =
  async () =>
    sqlQuery({
      query: SELECT_ARTISTS,
      parse: sqlParseTable,
      variables: [{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.artist),
      }],
    })

const playlists =
  async () =>
    sqlQuery({
      query: SELECT_PLAYLISTS,
      parse: sqlParseTable,
      variables: [{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.playlist),
      }],
    })

const user =
  async ({ args }) =>
    sqlQuery({
      query: SELECT_USER,
      parse: sqlParseRow,
      variables: [{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.user),
      },{
        key: "userId",
        value: args.userId,
      }],
    })

const play =
  async ({ args }) =>
    sqlQuery({
      query: SELECT_PLAY,
      parse: sqlParseRow,
      variables: [{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.play),
      },{
        key: "playId",
        value: args.playId,
      }],
    })

const song =
  async ({ args }) =>
    sqlQuery({
      query: SELECT_SONG,
      parse: sqlParseRow,
      variables: [{
        key: "songId",
        value: args.songId,
      },{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.song),
      }],
    })

const album =
  async ({ args }) =>
    sqlQuery({
      query: SELECT_ALBUM,
      parse: sqlParseRow,
      variables: [{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.album),
      },{
        key: "albumId",
        value: args.albumId,
      }],
    })

const genre =
  async ({ args }) =>
    sqlQuery({
      query: SELECT_GENRE,
      parse: sqlParseRow,
      variables: [{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.genre),
      },{
        key: "genreId",
        value: args.genreId,
      }],
    })

const artist =
  async ({ args }) =>
    sqlQuery({
      query: SELECT_ARTIST,
      parse: sqlParseRow,
      variables: [{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.artist),
      },{
        key: "artistId",
        value: args.artistId,
      }],
    })

const playlist =
  async ({ args }) =>
    sqlQuery({
      query: SELECT_PLAYLIST,
      parse: sqlParseRow,
      variables: [{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.playlist),
      },{
        key: "playlistId",
        value: args.playlistId,
      }],
    })

const newAlbums =
  async () =>
    sqlQuery({
      query: SELECT_NEW_ALBUMS,
      parse: sqlParseTable,
    })

const topTenSongs =
  async () =>
    sqlQuery({
      query: SELECT_TOP_TEN_SONGS,
      parse: sqlParseTable,
    })

const songSearch =
  async ({ args }) =>
    docSearch("songs", "song", "title")(args.query)

const albumSearch =
  async ({ args }) =>
    docSearch("albums", "album", "title")(args.query)

const genreSearch =
  async ({ args }) =>
    docSearch("genres", "genre", "name")(args.query)

const artistSearch =
  async ({ args }) =>
    docSearch("artists", "artist", "name")(args.query)

const queryResolver =
  mapResolver({
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
    newAlbums,
    songSearch,
    albumSearch,
    genreSearch,
    topTenSongs,
    artistSearch,
  })

export default queryResolver
