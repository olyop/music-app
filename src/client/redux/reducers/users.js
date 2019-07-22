import { users as init } from "../init"

import { SYNC_USERS } from "../types"

const users = (state = init, { type, payload }) => {
  switch (type) {
    case SYNC_USERS: return payload
    default: return state
  }
}

export default users
