import { GLOBAL_HEADERS } from "./globals.js"

export const globalHeaders = () => (req, res, nxt) => {
  res.set(GLOBAL_HEADERS)
  nxt()
}

export const foo = (x, y) => x === y
