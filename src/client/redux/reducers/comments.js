import { comments as init } from "../init"

import { SYNC_COMMENTS } from "../types"

const comments = (state = init, { type, payload }) => {
  switch (type) {
    case SYNC_COMMENTS: return payload
    default: return state
  }
}

export default comments
