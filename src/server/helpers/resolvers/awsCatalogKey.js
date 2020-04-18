import isNull from "lodash/isNull.js"
import toUpper from "lodash/toUpper.js"

const awsCatalogKey = (id, size = null) =>
  `catalog/${id}${isNull(size) ? ".mp3" : `_${toUpper(size)}.jpg`}`

export default awsCatalogKey
