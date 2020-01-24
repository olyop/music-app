import { isEmpty } from "lodash"
import { pipe } from "../../helpers/misc"
import { map, flattenDepth } from "lodash/fp"

const isSongsFieldEmpty = (collection, field) => pipe(collection)(
  map(song => song[field]),
  flattenDepth(1),
  isEmpty
)

export default isSongsFieldEmpty
