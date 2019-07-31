import React from "react"

import AddArtist from "./AddArtist"
import AddAlbum from "./AddAlbum"
import AddSong from "./AddSong"

import { Add as bem } from "../../../globals/bem"

import "./index.scss"

const Add = () => (
  <div className={bem("")}>
    <AddArtist/>
    <AddAlbum/>
    <AddSong/>
  </div>
)

export default Add
