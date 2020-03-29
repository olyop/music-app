import React from "react"

import Cover from "../Cover"
import DocLink from "../DocLink"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./Artist.scss"

const bem = reactBem("Artist")

const Artist = ({ artist }) => (
  <div className={bem("")}>
    <Cover
      url={artist.photo}
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
