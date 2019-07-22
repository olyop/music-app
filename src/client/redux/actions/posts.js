import { SYNC_POSTS } from "../types"

export const syncPosts = posts => ({
  type: SYNC_POSTS,
  payload: posts
})
