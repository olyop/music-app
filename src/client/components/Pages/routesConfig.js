import Catalog from "../Catalog"
import Library from "../Library"

import { uniqueId } from "lodash"

export default [
  {
    id: uniqueId(),
    path: "/catalog",
    name: "Catalog",
    component: Catalog,
  },
  {
    id: uniqueId(),
    path: "/library",
    name: "Library",
    component: Library,
  },
]
