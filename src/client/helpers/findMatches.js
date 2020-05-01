import { includes, lowerCase } from "lodash"
import determineDocNameKey from "./determineDocNameKey"

const findMatches = (db, text) => (
  db.filter(
    x => (
      includes(
        lowerCase(x[determineDocNameKey(x)]),
        lowerCase(text),
      )
    ),
  )
)

export default findMatches
