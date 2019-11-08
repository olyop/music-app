import React from "react"

import DocLinks from "../DocLinks"
import DocLink from "../DocLink"
import ImgLink from "../ImgLink"
import Icon from "../Icon"

import { string, arrayOf, object } from "prop-types"
import reactBEM from "@oly_op/react-bem"
import { noop } from "lodash"

import "./Album.scss"

const bem = reactBEM("Album")

const Album = ({ id, albumCoverUrl, title, artists }) => (
  <div className={bem("")}>
    <ImgLink
      imgUrl={albumCoverUrl}
      linkUrl={`/album/${id}`}
      className={bem("cover")}
      imgClassName={bem("coverImg")}
      children={(
        <Icon
          bem={bem}
          onClick={noop}
          icon="play_arrow"
          className="playButton"
        />
      )}
    />
    <div className={bem("info")}>
      <p className={bem("title")}>
        <DocLink
          path="/album"
          doc={{ id, title }}
        />
      </p>
      <p className={bem("artistName")}>
        <DocLinks
          path="/artist"
          docs={artists}
        />
      </p>
    </div>
  </div>
)

Album.propTypes = {
  id: string.isRequired,
  albumCoverUrl: string.isRequired,
  title: string.isRequired,
  artists: arrayOf(object).isRequired
}

export default Album
