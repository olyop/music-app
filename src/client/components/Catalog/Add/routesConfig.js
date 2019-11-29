import AddSong from "./AddSong"
import AddGenre from "./AddGenre"
import AddAlbum from "./AddAlbum"
import AddArtist from "./AddArtist"

import { uniqueId } from "lodash"

const routesConfig = [
  {
    id: uniqueId(),
    path: "/artist",
    name: "Artist",
    component: AddArtist,
  },
  {
    id: uniqueId(),
    path: "/album",
    name: "Album",
    component: AddAlbum,
  },
  {
    id: uniqueId(),
    path: "/genre",
    name: "Genre",
    component: AddGenre,
  },
  {
    id: uniqueId(),
    path: "/song",
    name: "Song",
    component: AddSong,
  },
]

export default routesConfig
