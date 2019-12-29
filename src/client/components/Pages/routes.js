import Catalog from "../Catalog"
import Library from "../Library"

import AlbumPage from "../AlbumPage"
import ArtistPage from "../ArtistPage"

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
    name: "Album",
    ignore: true,
    id: uniqueId(),
    path: "/album/:id",
    component: AlbumPage,
  },
  {
    ignore: true,
    id: uniqueId(),
    name: "Artist",
    path: "/artist/:id",
    component: ArtistPage,
  },
]
