import BrowseHome from "./BrowseHome"
import BrowseSongs from "./BrowseSongs"
import BrowseAlbums from "./BrowseAlbums"
import BrowseGenres from "./BrowseGenres"
import BrowseArtists from "./BrowseArtists"

import { uniqueId } from "lodash"

const routes = [
  {
    id: uniqueId(),
    path: "",
    ignore: true,
    name: "Home",
    icon: "home",
    component: BrowseHome,
  },
  {
    id: uniqueId(),
    path: "/albums",
    name: "Albums",
    icon: "album",
    component: BrowseAlbums,
  },
  {
    id: uniqueId(),
    path: "/artists",
    name: "Artists",
    icon: "person",
    component: BrowseArtists,
  },
  {
    id: uniqueId(),
    path: "/genres",
    name: "Genres",
    icon: "palette",
    component: BrowseGenres,
  },
  {
    id: uniqueId(),
    path: "/songs",
    name: "Songs",
    icon: "audiotrack",
    component: BrowseSongs,
  },
]

export default routes
