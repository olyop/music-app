import uuid from "uuid"
import ApolloServer from "apollo-server-express"
import sqlQuery from "../../../helpers/sql/sqlQuery.js"
import sqlUnique from "../../../helpers/sql/sqlUnique.js"
import isGenre from "../../../helpers/validators/isGenre.js"
import sqlParseRow from "../../../helpers/sql/sqlParseRow.js"
import determineFailedChecks from "../../../helpers/resolver/determineFailedChecks.js"
import determineChecksResults from "../../../helpers/resolver/determineChecksResults.js"

import { INSERT_GENRE } from "../../../sql/index.js"

const { UserInputError } = ApolloServer

const addGenre = async ({ args }) => {

  if (!isGenre(args)) {
    throw new UserInputError("Invalid arguments.")
  }

  const checks = [{
    name: "isGenreTaken",
    check: sqlUnique({
      column: "name",
      table: "genres",
      value: args.name,
    }),
  }]

  const checksResults = await determineChecksResults(checks)

  if (!checksResults.every(Boolean)) {
    const failedChecks = determineFailedChecks(checks, checksResults)
    throw new UserInputError("Checks failed.", { failedChecks })
  }

  const genreInsert = sqlQuery({
    query: INSERT_GENRE,
    parse: sqlParseRow,
    variables: [{
      key: "genreId",
      value: uuid.v4(),
    },{
      key: "name",
      value: args.name,
      parameterized: true,
    }],
  })

  return genreInsert
}

export default addGenre
