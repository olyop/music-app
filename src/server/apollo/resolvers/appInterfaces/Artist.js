import {
  SELECT_ARTIST_SONGS,
  SELECT_ARTIST_ALBUMS,
  SELECT_USER_DOC_PLAYS,
} from "../../../sql/index.js"

import userDocInLib from "./userDocInLib.js"
import userDocDateAdded from "./userDocDateAdded.js"
import sqlJoin from "../../../helpers/sql/sqlJoin.js"
import columnNames from "../../../sql/columnNames.js"
import sqlQuery from "../../../helpers/sql/sqlQuery.js"
import s3GetObject from "../../../helpers/s3/s3GetObject.js"
import toDataUrl from "../../../helpers/resolver/toDataUrl.js"
import sqlParseTable from "../../../helpers/sql/sqlParseTable.js"
import mapResolver from "../../../helpers/utilities/mapResolver.js"
import s3CatalogObjectKey from "../../../helpers/s3/s3CatalogObjectKey.js"

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

const songs =
  async ({ parent }) =>
    sqlQuery({
      query: SELECT_ARTIST_SONGS,
      parse: sqlParseTable,
      variables: [{
        key: "artistId",
        value: parent.artistId,
      },{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.song, "songs"),
      }],
    })

const albums =
  async ({ parent }) =>
    sqlQuery({
      query: SELECT_ARTIST_ALBUMS,
      parse: sqlParseTable,
      variables: [{
        key: "artistId",
        value: parent.artistId,
      },{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.album, "albums"),
      }],
    })

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
  })

export default artistResolver
