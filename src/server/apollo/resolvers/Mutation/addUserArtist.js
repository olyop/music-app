import {
  INSERT_USER_ARTIST,
  USER_LIBRARY_EXISTS,
  UPDATE_USER_ARTIST_IN,
} from "../../../sql/index.js"

import now from "../../../helpers/utilities/now.js"
import sqlQuery from "../../../helpers/sql/sqlQuery.js"
import sqlParseRow from "../../../helpers/sql/sqlParseRow.js"
import sqlResExists from "../../../helpers/sql/sqlResExists.js"

const addUserArtist = async ({ args }) => {

  const exists = await sqlQuery({
    query: USER_LIBRARY_EXISTS,
    parse: sqlResExists,
    variables: [{
      key: "table",
      value: "albums",
    },{
      key: "column",
      value: "artist_id",
    },{
      key: "userId",
      value: args.userId,
    },{
      key: "id",
      value: args.artistId,
    }],
  })

  if (exists) {
    return sqlQuery({
      query: UPDATE_USER_ARTIST_IN,
      parse: sqlParseRow,
      variables: [{
        key: "userId",
        value: args.userId,
      }, {
        key: "artistId",
        value: args.artistId,
      }],
    })
  } else {
    return sqlQuery({
      query: INSERT_USER_ARTIST,
      parse: sqlParseRow,
      variables: [{
        key: "userId",
        value: args.userId,
      }, {
        key: "artistId",
        value: args.artistId,
      }, {
        key: "dateCreated",
        value: now(),
      }],
    })
  }
}

export default addUserArtist
