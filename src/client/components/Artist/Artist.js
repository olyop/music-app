import React from "react"

import { Artist as bem } from "../../globals/bem"
import { propTypes } from "./props"

import "./Artist.scss"

const Artist = ({ artistKey, name }) => (
  <div className={bem("")}>
    <img
      alt="artistPhoto"
      className={bem("artistPhoto")}
      src={`/images/catalog/artistPhotos/${artistKey}.jpg`}
    />
    <h2 className={bem("name")}>
      {name}
    </h2>
  </div>
)

Artist.propTypes = propTypes

export default Artist
