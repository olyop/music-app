import { pipe } from "../../../helpers"
import { map, flatten, uniq } from "lodash/fp"

const determineGenres = songs =>
  pipe(songs)(
    map(({ genres }) => genres),
    flatten,
    ({ val }) => val,
    uniq,
  )

export default determineGenres
