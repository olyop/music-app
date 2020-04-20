import isNull from "lodash/isNull.js"
import toLower from "lodash/toLower.js"

const awsCatalogKey = (id, size = null) =>
  `catalog/${id}/${isNull(size) ? "full.mp3" : `${toLower(size)}.jpg`}`

export default awsCatalogKey
