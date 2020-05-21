import pipe from "./pipe.js"
import head from "lodash/head.js"
import map from "lodash/fp/map.js"
import reduce from "lodash/fp/reduce.js"
import orderBy from "lodash/fp/orderBy.js"

const calculateMode = arr => pipe(arr)(
  reduce(
    (freq, item) => ({
      ...freq,
      [item]: freq[item] ? freq[item] += 1 : 1,
    }),
    {},
  ),
  Object.entries,
  map(([ key, val ]) => ({ key, val })),
  orderBy("val", "desc"),
  head,
  ({ key }) => key,
)

export default calculateMode
