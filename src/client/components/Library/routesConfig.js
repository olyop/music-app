import LibraryArtists from "./LibraryArtists"
import LibraryAlbums from "./LibraryAlbums"
import LibrarySongs from "./LibrarySongs"

import { uniqueId } from "lodash"

const routesConfigLibrary = [
  {
    id: uniqueId(),
    path: "/albums",
    name: "Albums",
    component: LibraryAlbums
  },
  {
    id: uniqueId(),
    path: "/artists",
    name: "Artists",
    component: LibraryArtists
  },
  {
    id: uniqueId(),
    path: "/songs",
    name: "Songs",
    component: LibrarySongs
  }
]

export default routesConfigLibrary
