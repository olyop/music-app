import toLower from "lodash/toLower.js"
import isUndefined from "lodash/isUndefined.js"

const awsCatalogKey = (id, size) =>
  `catalog/${id}/${isUndefined(size) ? "index.mp3" : `${toLower(size)}.jpg`}`

export default awsCatalogKey
