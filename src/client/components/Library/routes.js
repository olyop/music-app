import LibrarySongs from "./LibrarySongs"
import LibraryAlbums from "./LibraryAlbums"
import LibraryPlaylists from "./LibraryPlaylists"

import { uniqueId } from "lodash"

const routes = [
  {
    icon: "playlist_play",
    id: uniqueId(),
    name: "Playlists",
    path: "/playlists",
    component: LibraryPlaylists,
  },
  {
    name: "Songs",
    id: uniqueId(),
    path: "/songs",
    icon: "audiotrack",
    component: LibrarySongs,
  },
  {
    name: "Albums",
    id: uniqueId(),
    path: "/albums",
    icon: "album",
    component: LibraryAlbums,
  },
]

export default routes
