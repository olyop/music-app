import { uniq } from "lodash"
import { pipe } from "../../helpers/misc"
import { map, flattenDepth } from "lodash/fp"

const genresFromAlbum = album => pipe(album)(
  ({ songs }) => songs,
  map(({ genres }) => genres),
  flattenDepth(2),
  uniq,
)

export default genresFromAlbum
