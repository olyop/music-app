import sqlExists from "./sqlExists.js"

const sqlUnique = ({ value, table, column }) => new Promise(
  (resolve, reject) => {
    sqlExists({ table, value, column })
      .then(exists => resolve(!exists))
      .catch(reject)
  },
)

export default sqlUnique
