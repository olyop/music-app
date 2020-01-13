import LibrarySongs from "./LibrarySongs"
import LibraryAlbums from "./LibraryAlbums"

import { uniqueId } from "lodash"

const routes = [
  {
    icon: "album",
    id: uniqueId(),
    name: "Albums",
    path: "/albums",
    component: LibraryAlbums,
  },
  {
    name: "Songs",
    id: uniqueId(),
    path: "/songs",
    icon: "audiotrack",
    component: LibrarySongs,
  },
]

export default routes
