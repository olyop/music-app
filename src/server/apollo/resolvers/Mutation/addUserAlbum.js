import {
  SELECT_ALBUM,
  INSERT_USER_ALBUM,
  USER_LIBRARY_EXISTS,
  UPDATE_USER_ALBUM_IN,
} from "../../../sql/index.js"

import now from "../../../helpers/utilities/now.js"
import sqlQuery from "../../../helpers/sql/sqlQuery.js"
import sqlParseRow from "../../../helpers/sql/sqlParseRow.js"
import sqlResExists from "../../../helpers/sql/sqlResExists.js"

const addUserAlbum = async ({ args }) => {

  const exists = await sqlQuery({
    query: USER_LIBRARY_EXISTS,
    parse: sqlResExists,
    variables: [{
      key: "table",
      value: "albums",
    },{
      key: "column",
      value: "album_id",
    },{
      key: "userId",
      value: args.userId,
    },{
      key: "id",
      value: args.albumId,
    }],
  })

  if (exists) {
    await sqlQuery({
      query: UPDATE_USER_ALBUM_IN,
      parse: sqlParseRow,
      variables: [{
        key: "userId",
        value: args.userId,
      },{
        key: "albumId",
        value: args.albumId,
      }],
    })
  } else {
    await sqlQuery({
      query: INSERT_USER_ALBUM,
      parse: sqlParseRow,
      variables: [{
        key: "userId",
        value: args.userId,
      },{
        key: "albumId",
        value: args.albumId,
      },{
        key: "dateCreated",
        value: now(),
      }],
    })
  }

  return sqlQuery({
    query: SELECT_ALBUM,
    parse: sqlParseRow,
    variables: [{
      key: "albumId",
      value: args.albumId,
    }],
  })
}

export default addUserAlbum
