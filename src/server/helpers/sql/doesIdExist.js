import isColumnUnique from "./isColumnUnique.js"

const doesIdExist = (id, column, table) => new Promise(
  (resolve, reject) => {
    isColumnUnique(column, id, table)
      .then(isUnique => resolve(!isUnique))
      .catch(reject)
  },
)

export default doesIdExist
