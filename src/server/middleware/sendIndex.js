import { request } from "../helpers/index.js"
import { BUILD_ENTRY_PATH } from "../globals.js"

const sendIndex = ({ res, nxt }) => {
  res.sendFile(BUILD_ENTRY_PATH)
  nxt()
}

export default () => request(sendIndex)
