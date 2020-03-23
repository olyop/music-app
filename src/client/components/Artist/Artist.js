import React from "react"

import Cover from "../Cover"
import DocLink from "../DocLink"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"
import { catalogUrl } from "../../helpers/misc"

import "./Artist.scss"

const bem = reactBem("Artist")

const Artist = ({ artist }) => (
  <div className={bem("")}>
    <Cover
      url={catalogUrl(artist)}
      className={bem("cover")}
    />
    <h2 className={bem("name")}>
      <DocLink
        doc={artist}
        path="/artist"
      />
    </h2>
  </div>
)

Artist.propTypes = propTypes

export default Artist
