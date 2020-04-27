import request from "../helpers/utilities/request.js"
import { BUILD_ENTRY_PATH } from "../globals/paths.js"

const sendIndex = ({ res, nxt }) => {
  res.sendFile(BUILD_ENTRY_PATH)
  nxt()
}

export default () => request(sendIndex)
