import { sqlQuery } from "./sqlQuery"
import { sqlResExists } from "./sqlResExists"

import { EXISTS_COLUMN } from "../../sql/index.js"

const sqlExistsQuery = ({ value, table, column }) =>
  sqlQuery({
    query: EXISTS_COLUMN,
    parse: sqlResExists,
    variables: [{
      value,
      key: "value",
      parameterized: true,
    },{
      key: "table",
      value: table,
      string: false,
    },{
      key: "column",
      value: column,
      string: false,
    }],
  })

export const sqlExists = input => new Promise(
  (resolve, reject) => {
    if (Array.isArray(input.value)) {
      return Promise
        .all(input.value.map(value => sqlExistsQuery({ ...input, value })))
        .then(res => resolve(res.every(Boolean)))
        .catch(reject)
    } else {
      return sqlExistsQuery(input)
        .then(resolve)
        .catch(reject)
    }
  },
)
