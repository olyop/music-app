import React from "react"

import Cover from "../Cover"
import DocLink from "../DocLink"
import DocLinks from "../DocLinks"
import InLibraryButton from "../InLibraryButton"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./Album.scss"

const bem = reactBem("Album")

const Album = ({ album }) => (
  <div className={bem("")}>
    <Cover url={album.cover} />
    <div className={bem("info")}>
      <div className={bem("info-text")}>
        <p className={bem("info-text-title")}>
          <DocLink
            doc={album}
            path="/album"
          />
        </p>
        <p className={bem("info-text-artists")}>
          <DocLinks
            ampersand
            path="/artist"
            docs={album.artists}
          />
        </p>
      </div>
      <InLibraryButton
        doc={album}
        className={bem("info-add")}
      />
    </div>
  </div>
)

Album.propTypes = propTypes

export default Album
