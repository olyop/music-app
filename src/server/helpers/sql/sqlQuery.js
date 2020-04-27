import pg from "../../services/pg.js"
import sqlBaseQuery from "./sqlBaseQuery.js"

const sqlQuery = config => new Promise(
  (resolve, reject) => {
    sqlBaseQuery(pg)(config)
      .then(resolve)
      .catch(reject)
  },
)

export default sqlQuery
