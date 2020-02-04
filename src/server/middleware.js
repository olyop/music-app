import { request } from "./helpers/misc.js"
import { GLOBAL_HEADERS } from "./globals.js"

export const globalHeaders = () => request(
  ({ res, nxt }) => {
    res.set(GLOBAL_HEADERS)
    nxt()
  }
)
