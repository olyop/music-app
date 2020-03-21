import React from "react"

import Cover from "../Cover"
import DocLink from "../DocLink"
import DocLinks from "../DocLinks"
import AddToLibrary from "../AddToLibrary"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"
import { catalogUrl } from "../../helpers/misc"

import "./Album.scss"

const bem = reactBem("Album")

const Album = ({ album }) => {
  const { id, artists } = album
  return (
    <div className={bem("")}>
      <Cover url={catalogUrl(id)} />
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
              path="/artist"
              docs={artists}
              ampersand={true}
            />
          </p>
        </div>
        <AddToLibrary
          doc={album}
          className={bem("info-add")}
        />
      </div>
    </div>
  )
}

Album.propTypes = propTypes

export default Album
