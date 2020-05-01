import isNull from "lodash/isNull.js"

const sqlJoin = (names, prefix = null) =>
  (isNull(prefix) ? "" : `${prefix}.`) +
  names.join(isNull(prefix) ? ", " : `, ${prefix}.`)

export default sqlJoin
