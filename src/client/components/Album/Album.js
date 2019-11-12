import React, { Fragment } from "react"

import DocLinks from "../DocLinks"
import DocLink from "../DocLink"
import ImgLink from "../ImgLink"
import Icon from "../Icon"

import { string, arrayOf, object } from "prop-types"
import reactBEM from "@oly_op/react-bem"

import "./Album.scss"

const bem = reactBEM("Album")

const Album = ({ id, albumCoverUrl, title, artists }) => (
  <div className={bem("")}>
    <ImgLink
      imgUrl={albumCoverUrl}
      className={bem("cover")}
      imgClassName={bem("cover-img")}
      children={(
        <Fragment>
          <Icon
            icon="play_arrow"
            className={bem("cover-top-left", "cover-icon")}
          />
          <Icon
            icon="queue_music"
            className={bem("cover-top-right", "cover-icon")}
          />
          <Icon
            icon="album"
            className={bem("cover-bottom-left", "cover-icon")}
          />
          <Icon
            icon="delete"
            className={bem("cover-bottom-right", "cover-icon")}
          />
          <div
            className={bem("cover-blackBox")}
          />
        </Fragment>
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
