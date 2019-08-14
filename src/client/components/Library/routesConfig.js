import LibraryArtists from "./LibraryArtists"
import LibraryAlbums from "./LibraryAlbums"
import LibrarySongs from "./LibrarySongs"

import { uniqueId } from "lodash"

const routesConfigLibrary = [
  {
    id: uniqueId(),
    path: "/albums",
    name: "Albums",
    icon: "album",
    component: LibraryAlbums
  },
  {
    id: uniqueId(),
    path: "/artists",
    name: "Artists",
    icon: "person",
    component: LibraryArtists
  },
  {
    id: uniqueId(),
    path: "/songs",
    name: "Songs",
    icon: "audiotrack",
    component: LibrarySongs
  }
]

export default routesConfigLibrary
