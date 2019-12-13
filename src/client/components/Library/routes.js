import LibrarySongs from "./LibrarySongs"
import LibraryAlbums from "./LibraryAlbums"
import LibraryGenres from "./LibraryGenres"
import LibraryArtists from "./LibraryArtists"

import { uniqueId } from "lodash"

const routes = [
  {
    id: uniqueId(),
    path: "/albums",
    name: "Albums",
    icon: "album",
    component: LibraryAlbums,
  },
  {
    id: uniqueId(),
    path: "/artists",
    name: "Artists",
    icon: "person",
    component: LibraryArtists,
  },
  {
    id: uniqueId(),
    path: "/genres",
    name: "Genres",
    icon: "person",
    component: LibraryGenres,
  },
  {
    id: uniqueId(),
    path: "/songs",
    name: "Songs",
    icon: "audiotrack",
    component: LibrarySongs,
  },
]

export default routes
