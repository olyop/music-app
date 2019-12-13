import Catalog from "../Catalog"
import Library from "../Library"
import AlbumPage from "../AlbumPage"

import { uniqueId } from "lodash"

export default [
  {
    id: uniqueId(),
    name: "Catalog",
    path: "/catalog",
    component: Catalog,
  },
  {
    id: uniqueId(),
    name: "Library",
    path: "/library",
    component: Library,
  },
  {
    name: "album",
    id: uniqueId(),
    ignore: true,
    path: "/album/:id",
    component: AlbumPage,
  },
]
