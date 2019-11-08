import React from "react"

import DocLink from "../DocLink"
import ImgLink from "../ImgLink"

import reactBEM from "@oly_op/react-bem"
import { string } from "prop-types"

import "./Artist.scss"

const bem = reactBEM("Artist")

const Artist = ({ id, name, artistPhotoUrl }) => (
  <div className={bem("")}>
    <ImgLink
      imgUrl={artistPhotoUrl}
      className={bem("photo")}
      linkUrl={`/artist/${id}`}
    />
    <h2 className={bem("name")}>
      <DocLink
        path="/artist"
        doc={{ id, name }}
      />
    </h2>
  </div>
)

Artist.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  artistPhotoUrl: string.isRequired
}

export default Artist
