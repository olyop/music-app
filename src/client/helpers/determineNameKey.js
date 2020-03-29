import { isUndefined } from "lodash"

const determineNameKey = doc => {
  if (!isUndefined(doc.name)) return "name"
  else if (!isUndefined(doc.title)) return "title"
  else return "name"
}

export default determineNameKey
