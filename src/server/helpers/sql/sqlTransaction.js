import pg from "../../services/pg.js"
import sqlBaseQuery from "./sqlBaseQuery.js"
import promiseSequence from "../utils/promiseSequence.js"

const sqlTransaction = configs => new Promise(
  (resolve, reject) => {
    pg.connect(
      (connectError, client) => {
        if (connectError) reject(connectError)
        const queries = configs.map(sqlBaseQuery(client))
        let res
        client
          .query("BEGIN")
          .then(() => promiseSequence(queries))
          .then(result => {
            res = result
            return client.query("COMMIT")
          })
          .catch(queryError => {
            reject(queryError)
            return client.query("ROLLBACK")
          })
          .then(() => resolve(res))
          .catch(reject)
          .finally(() => client.release())
      },
    )
  },
)

export default sqlTransaction
