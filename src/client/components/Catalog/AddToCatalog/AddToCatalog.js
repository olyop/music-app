import React from "react"

import AddToCatalogArtist from "./AddToCatalogArtist"
import AddToCatalogAlbum from "./AddToCatalogAlbum"
import AddToCatalogSong from "./AddToCatalogSong"

import { AddToCatalog as bem } from "../../../globals/bem"

import "./AddToCatalog.scss"

const AddToCatalog = () => (
  <div className={bem("")}>
    <AddToCatalogArtist/>
    <AddToCatalogAlbum/>
    <AddToCatalogSong/>
  </div>
)

export default AddToCatalog
