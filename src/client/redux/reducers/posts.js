import { posts as init } from "../init"

import { SYNC_POSTS } from "../types"

const posts = (state = init, { type, payload }) => {
  switch (type) {
    case SYNC_POSTS: return payload
    default: return state
  }
}

export default posts
