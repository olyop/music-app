import {
  SELECT_ARTIST_SONGS,
  SELECT_ARTIST_ALBUMS,
  SELECT_USER_DOC_PLAYS,
} from "../../sql/index.js"

import sqlJoin from "../../helpers/sql/sqlJoin.js"
import columnNames from "../../sql/columnNames.js"
import userDocInLib from "./common/userDocInLib.js"
import sqlQuery from "../../helpers/sql/sqlQuery.js"
import s3GetObject from "../../helpers/s3/s3GetObject.js"
import sqlRowCount from "../../helpers/sql/sqlRowCount.js"
import userDocDateAdded from "./common/userDocDateAdded.js"
import toDataUrl from "../../helpers/resolver/toDataUrl.js"
import sqlParseTable from "../../helpers/sql/sqlParseTable.js"
import mapResolver from "../../helpers/utils/mapResolver.js"
import s3CatalogObjectKey from "../../helpers/s3/s3CatalogObjectKey.js"

const photo =
  async ({ parent, args }) =>
    s3GetObject({
      parse: toDataUrl,
      key: s3CatalogObjectKey({
        id: parent.artistId,
        size: args.size,
        format: "jpg",
      }),
    })

const getArtistSongs = (parent, parse) =>
  sqlQuery({
    query: SELECT_ARTIST_SONGS,
    parse,
    variables: [{
      key: "artistId",
      value: parent.artistId,
    },{
      string: false,
      key: "columnNames",
      value: sqlJoin(columnNames.song, "songs"),
    }],
  })

const songs =
  async ({ parent }) =>
    getArtistSongs(parent, sqlParseTable)

const numOfSongs =
  async ({ parent }) =>
    getArtistSongs(parent, sqlRowCount)

const getArtistAlbums = (parent, parse) =>
  sqlQuery({
    query: SELECT_ARTIST_ALBUMS,
    parse,
    variables: [{
      key: "artistId",
      value: parent.artistId,
    },{
      string: false,
      key: "columnNames",
      value: sqlJoin(columnNames.album, "albums"),
    }],
  })

const albums =
  async ({ parent }) =>
    getArtistAlbums(parent, sqlParseTable)

const numOfAlbums =
  async ({ parent }) =>
    getArtistAlbums(parent, sqlRowCount)

const plays =
  async ({ parent, args }) =>
    sqlQuery({
      query: SELECT_USER_DOC_PLAYS,
      parse: sqlParseTable,
      variables: [{
        key: "userId",
        value: args.userId,
      },{
        key: "albumId",
        value: parent.albumId,
      },{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.play),
      }],
    })

const dateAdded =
  userDocDateAdded({
    key: "artistId",
    columnName: "artist_id",
    userDocTable: "users_artists",
  })

const inLibrary =
  userDocInLib({
    key: "artistId",
    columnName: "artist_id",
    userDocTable: "users_artists",
  })

const artistResolver =
  mapResolver({
    photo,
    songs,
    plays,
    albums,
    dateAdded,
    inLibrary,
    numOfSongs,
    numOfAlbums,
  })

export default artistResolver
