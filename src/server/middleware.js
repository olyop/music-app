const { GLOBAL_HEADERS } = require("./globals")
const { assign } = require("lodash")

const globalHeaders = () => (req, res, nxt) => {
  res.set(GLOBAL_HEADERS)
  nxt()
}

assign(exports, { globalHeaders })
