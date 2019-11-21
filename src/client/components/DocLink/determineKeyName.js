import { isUndefined } from "lodash"

const determineKeyName = doc => {
  if (!isUndefined(doc.name)) return "name"
  else if (!isUndefined(doc.title)) return "title"
  else return "name"
}

export default determineKeyName
