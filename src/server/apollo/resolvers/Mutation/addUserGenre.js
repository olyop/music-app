import {
  INSERT_USER_GENRE,
  USER_LIBRARY_EXISTS,
  UPDATE_USER_GENRE_IN,
} from "../../../sql/index.js"

import now from "../../../helpers/utilities/now.js"
import sqlQuery from "../../../helpers/sql/sqlQuery.js"
import sqlParseRow from "../../../helpers/sql/sqlParseRow.js"
import sqlResExists from "../../../helpers/sql/sqlResExists.js"

const addUserGenre = async ({ args }) => {

  const exists = await sqlQuery({
    query: USER_LIBRARY_EXISTS,
    parse: sqlResExists,
    variables: [{
      key: "table",
      value: "songs",
    }, {
      key: "column",
      value: "song_id",
    }, {
      key: "userId",
      value: args.userId,
    }, {
      key: "id",
      value: args.songId,
    }],
  })

  if (exists) {
    return sqlQuery({
      query: UPDATE_USER_GENRE_IN,
      parse: sqlParseRow,
      variables: [{
        key: "userId",
        value: args.userId,
      }, {
        key: "genreId",
        value: args.genreId,
      }],
    })
  } else {
    return sqlQuery({
      query: INSERT_USER_GENRE,
      parse: sqlParseRow,
      variables: [{
        key: "userId",
        value: args.userId,
      }, {
        key: "genreId",
        value: args.genreId,
      }, {
        key: "dateCreated",
        value: now(),
      }],
    })
  }
}

export default addUserGenre
