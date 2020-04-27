import request from "../helpers/utilities/request.js"
import { GLOBAL_HTTP_HEADERS } from "../globals/miscellaneous.js"

const globalHeaders = ({ res, nxt }) => {
  res.set(GLOBAL_HTTP_HEADERS)
  nxt()
}

export default () => request(globalHeaders)
