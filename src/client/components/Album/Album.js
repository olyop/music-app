import React from "react"

import Cover from "../Cover"
import DocLink from "../DocLink"
import DocLinks from "../DocLinks"

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
        <p className={bem("title")}>
          <DocLink
            doc={album}
            path="/album"
          />
        </p>
        <p className={bem("artists")}>
          <DocLinks
            docs={artists}
            path="/artist"
            ampersand={false}
          />
        </p>
      </div>
    </div>
  )
}

Album.propTypes = propTypes

export default Album
