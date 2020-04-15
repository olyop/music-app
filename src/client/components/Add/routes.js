import AddSong from "./AddSong"
import AddGenre from "./AddGenre"
import AddAlbum from "./AddAlbum"
import AddArtist from "./AddArtist"

import _AddAlbum from "./_AddAlbum"

import { uniqueId } from "lodash"

const routes = [
  {
    id: uniqueId(),
    path: "/artist",
    name: "Artist",
    icon: "person",
    component: AddArtist,
  },
  {
    id: uniqueId(),
    path: "/album",
    name: "Album",
    icon: "album",
    component: AddAlbum,
  },
  {
    id: uniqueId(),
    path: "/genre",
    icon: "palette",
    name: "Genre",
    component: AddGenre,
  },
  {
    id: uniqueId(),
    path: "/song",
    name: "Song",
    icon: "audiotrack",
    component: AddSong,
  },
  {
    id: uniqueId(),
    path: "/_album",
    name: "_Album",
    icon: "album",
    component: _AddAlbum,
  },
]

export default routes
