import React from "react"

import Info from "../Info"
import Cover from "../Cover"
import DocLink from "../DocLink"

import { propTypes } from "./props"

import "./index.scss"

const Artist = ({ artist }) => (
  <div className="Artist Card Elevated">
    <Cover
      url={artist.photo}
      className="Artist__cover"
    />
    <Info
      doc={artist}
      className="Artist__info"
      addClassName="Artist__add"
      textClassName="Artist__text"
      upper={<DocLink doc={artist} path="/artist" />}
      lower={`${artist.numOfAlbums} albums, ${artist.numOfSongs} of songs`}
    />
  </div>
)

Artist.propTypes = propTypes

export default Artist
