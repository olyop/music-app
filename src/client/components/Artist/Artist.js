import React from "react"

import Cover from "../Cover"
import DocLink from "../DocLink"
import AddToLibrary from "../AddToLibrary"

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
    <div className={bem("info")}>
      <h2 className={bem("info-name")}>
        <DocLink
          doc={artist}
          path="/artist"
        />
      </h2>
      <AddToLibrary
        doc={artist}
        className={bem("info-add")}
      />
    </div>
  </div>
)

Artist.propTypes = propTypes

export default Artist
