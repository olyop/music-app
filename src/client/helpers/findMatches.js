import { includes, lowerCase } from "lodash"
import determineKeyName from "./determineKeyName"

const findMatches = (db, text) => (
  db.filter(
    x => (
      includes(
        lowerCase(x[determineKeyName(x)]),
        lowerCase(text),
      )
    ),
  )
)

export default findMatches
