import LibrarySongs from "./LibrarySongs"
import LibraryAlbums from "./LibraryAlbums"
import LibraryGenres from "./LibraryGenres"
import LibraryArtists from "./LibraryArtists"
import LibraryPlaylists from "./LibraryPlaylists"

import { uniqueId } from "lodash"

const routes = [
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
  {
    name: "Genres",
    id: uniqueId(),
    path: "/genres",
    icon: "palette",
    component: LibraryGenres,
  },
  {
    name: "Artists",
    id: uniqueId(),
    path: "/artists",
    icon: "person",
    component: LibraryArtists,
  },
  {
    icon: "playlist_play",
    id: uniqueId(),
    name: "Playlists",
    path: "/playlists",
    component: LibraryPlaylists,
  },
]

export default routes
