import Queues from "../Queues"
import Search from "../Search"
import Player from "../Player"
import Catalog from "../Catalog"
import Library from "../Library"
import UserPage from "../UserPage"
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
    ignore: true,
    id: uniqueId(),
    name: "Player",
    path: "/player",
    component: Player,
  },
  {
    ignore: true,
    id: uniqueId(),
    name: "Search",
    path: "/search",
    component: Search,
  },
  {
    ignore: true,
    id: uniqueId(),
    name: "Queues",
    path: "/queues",
    component: Queues,
  },
  {
    ignore: true,
    path: "/user",
    id: uniqueId(),
    component: UserPage,
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
