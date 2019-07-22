import { SYNC_USERS } from "../types"

export const syncUsers = users => ({
  type: SYNC_USERS,
  payload: users
})
