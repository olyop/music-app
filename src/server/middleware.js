const { GLOBAL_HEADERS } = require("./globals")

const globalHeaders = () => (req, res, nxt) => {
  res.set(GLOBAL_HEADERS)
  nxt()
}

Object.assign(exports, {
  globalHeaders
})
