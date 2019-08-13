import AddArtist from "./AddArtist"
import AddLabel from "./AddLabel"
import AddAlbum from "./AddAlbum"
import AddGenre from "./AddGenre"
import AddSong from "./AddSong"

import { uniqueId } from "lodash"

export default [
  {
    id: uniqueId(),
    path: "/artist",
    name: "Artist",
    component: AddArtist
  },
  {
    id: uniqueId(),
    path: "/label",
    name: "Label",
    component: AddLabel
  },
  {
    id: uniqueId(),
    path: "/album",
    name: "Album",
    component: AddAlbum
  },
  {
    id: uniqueId(),
    path: "/genre",
    name: "Genre",
    component: AddGenre
  },
  {
    id: uniqueId(),
    path: "/song",
    name: "Song",
    component: AddSong
  }
]
