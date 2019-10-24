import React from "react"

import { Artist as bem } from "../../globals/bem"
import { string } from "prop-types"

import "./Artist.scss"

const Artist = ({ id, name }) => (
  <div className={bem("")}>
    <img
      alt="artistPhoto"
      className={bem("artistPhoto")}
      src={`/images/catalog/artistPhotos/${id}.jpg`}
    />
    <h2 className={bem("name")}>
      {name}
    </h2>
  </div>
)

Artist.propTypes = {
  id: string.isRequired,
  name: string.isRequired
}

export default Artist
