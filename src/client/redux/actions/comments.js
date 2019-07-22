import { SYNC_COMMENTS } from "../types"

export const syncComments = comments => ({
  type: SYNC_COMMENTS,
  payload: comments
})
