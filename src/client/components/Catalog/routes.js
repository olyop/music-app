import Add from "./Add"
import Browse from "../Browse"

import { uniqueId } from "lodash"

const routes = [
  {
    path: "/add",
    id: uniqueId(),
    component: Add,
    name: "Add",
  },
  {
    id: uniqueId(),
    name: "Browse",
    path: "/browse",
    component: Browse,
  },
]

export default routes
