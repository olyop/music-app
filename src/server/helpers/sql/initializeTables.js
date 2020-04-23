import queryDatabase from "./queryDatabase.js"

const initializeTables = tables => {
  tables.reduce(
    async (prev, next) => {
      try {
        await prev
      } catch (error) {
        throw new Error(error)
      }
      return queryDatabase({ query: next })
    },
    Promise.resolve(),
  )
}

export default initializeTables
