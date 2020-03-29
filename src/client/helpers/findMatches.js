import { includes, lowerCase } from "lodash"
import determineNameKey from "./determineNameKey"

const findMatches = (db, text) => (
  db.filter(
    x => (
      includes(
        lowerCase(x[determineNameKey(x)]),
        lowerCase(text),
      )
    ),
  )
)

export default findMatches
