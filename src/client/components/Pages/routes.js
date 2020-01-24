import Search from "../Search"
import Catalog from "../Catalog"
import Library from "../Library"

import GenrePage from "../GenrePage"
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
    id: uniqueId(),
    name: "Search",
    path: "/search",
    component: Search,
  },
  {
    ignore: true,
    id: uniqueId(),
    path: "/album/:id",
    component: AlbumPage,
  },
  {
    ignore: true,
    id: uniqueId(),
    path: "/artist/:id",
    component: ArtistPage,
  },
  {
    ignore: true,
    id: uniqueId(),
    path: "/genre/:id",
    component: GenrePage,
  },
]
