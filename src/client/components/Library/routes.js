import LibrarySongs from "./LibrarySongs"
import LibraryAlbums from "./LibraryAlbums"
import LibraryArtists from "./LibraryArtists"
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
    name: "Artists",
    id: uniqueId(),
    path: "/artists",
    icon: "person",
    component: LibraryArtists,
  },
  {
    name: "Albums",
    id: uniqueId(),
    path: "/albums",
    icon: "album",
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
