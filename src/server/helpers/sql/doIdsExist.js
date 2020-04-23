import every from "lodash/every.js"
import isEmpty from "lodash/isEmpty.js"
import doesIdExist from "./doesIdExist.js"

const doIdsExist = (ids, column, table) => new Promise(
  (resolve, reject) => {
    if (isEmpty(ids)) {
      resolve(true)
    } else {
      Promise
        .all(ids.map(id => doesIdExist(id, column, table)))
        .then(exists => resolve(every(exists)))
        .catch(reject)
    }
  },
)

export default doIdsExist
