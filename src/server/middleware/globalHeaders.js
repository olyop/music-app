import { GLOBAL_HTTP_HEADERS } from "../globals/miscellaneous.js"

const globalHeaders = (_, res, nxt) => {
  res.set(GLOBAL_HTTP_HEADERS)
  nxt()
}

export default () => globalHeaders
