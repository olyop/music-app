import path from "path"
import sqlQuery from "./sqlQuery.js"
import sqlImport from "./sqlImport.js"
import isArray from "lodash/isArray.js"
import sqlIsResEmpty from "./sqlIsResEmpty.js"
import { SQL_FOLER_PATH } from "../../globals/paths.js"

const queryPath = path.join(SQL_FOLER_PATH, "selects", "exists.sql")

const sqlExistsQuery = ({ value, table, column }) =>
  sqlQuery({
    query: sqlImport(queryPath),
    parse: res => !sqlIsResEmpty(res),
    variables: [
      {
        value,
        key: "value",
        parameterized: true,
      },
      {
        key: "table",
        value: table,
        string: false,
      },
      {
        key: "column",
        value: column,
        string: false,
      },
    ],
  })

const sqlExists = ({ value, table, column }) => new Promise(
  (resolve, reject) => (
    isArray(value) ? (
      Promise
        .all(value.map(x => sqlExistsQuery({ value: x, table, column })))
        .then(res => resolve(res.every(Boolean)))
    ) : (
      sqlExistsQuery({ value, table, column })
        .then(resolve)
    )
  ).catch(reject),
)

export default sqlExists
