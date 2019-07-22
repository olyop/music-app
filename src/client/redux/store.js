import { createStore, applyMiddleware, combineReducers } from "redux"
import { composeEnhancers } from "../helpers/misc"

import users from "./reducers/users"
import posts from "./reducers/posts"
import comments from "./reducers/comments"

const reducers = {
  users,
  posts,
  comments
}

const middleware = []

const reducer = combineReducers(reducers)
const storeEnchancer = composeEnhancers(applyMiddleware(...middleware))

const store = createStore(reducer, storeEnchancer)

export default store
