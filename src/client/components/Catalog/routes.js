import Add from "./Add"

import { uniqueId } from "lodash"

const routes = [
  {
    id: uniqueId(),
    path: "/add",
    name: "Add To Catalog",
    component: Add,
  },
]

export default routes
