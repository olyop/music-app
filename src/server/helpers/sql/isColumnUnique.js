import query from "./query.js"

const isColumnUnique = ({ query, column, value }) => new Promise(
  (resolve, reject) => (
    queryDatabase({ query, variables: { column, table, value } })
      .then(res => resolve(res.rowCount === 0))
      .catch(reject)
  ),
)

export default isColumnUnique
