import { BUILD_ENTRY_PATH } from "../globals/paths.js"

const sendIndex = (_, res, nxt) => {
  res.sendFile(BUILD_ENTRY_PATH)
  nxt()
}

export default () => sendIndex
