import React from "react"

import Info from "../Info"
import Cover from "../Cover"
import DocLink from "../DocLink"
import DocLinks from "../DocLinks"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./index.scss"

const bem = reactBem("Album")

const Album = ({ album }) => (
  <div className={bem("", "Card", "Elevated")}>
    <Cover url={album.cover} />
    <Info
      doc={album}
      className={bem("info")}
      upper={<DocLink doc={album} />}
      lower={<DocLinks ampersand docs={album.artists} />}
    />
  </div>
)

Album.propTypes = propTypes

export default Album
