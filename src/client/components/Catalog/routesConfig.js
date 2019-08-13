import Add from "./Add"

import { uniqueId } from "lodash"

export default [
  {
    id: uniqueId(),
    path: "/add",
    name: "Add To Catalog",
    component: Add
  }
]
