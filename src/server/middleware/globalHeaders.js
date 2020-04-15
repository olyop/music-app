import { request } from "../helpers/index.js"
import { GLOBAL_HTTP_HEADERS } from "../globals.js"

const globalHeaders = ({ res, nxt }) => {
  res.set(GLOBAL_HTTP_HEADERS)
  nxt()
}

export default () => request(globalHeaders)
