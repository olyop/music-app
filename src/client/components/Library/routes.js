import LibrarySongs from "./LibrarySongs"
// import LibraryPlaylists from "./LibraryPlaylists"

import { uniqueId } from "lodash"

const routes = [
  // {
  //   icon: "playlist_play",
  //   id: uniqueId(),
  //   name: "Playlists",
  //   path: "/playlists",
  //   component: LibraryPlaylists,
  // },
  {
    name: "Songs",
    id: uniqueId(),
    path: "/songs",
    icon: "audiotrack",
    component: LibrarySongs,
  },
]

export default routes
