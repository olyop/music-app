import React, { Fragment } from "react"

import IconText from "../IconText"
import DocLinks from "../DocLinks"
import DocLink from "../DocLink"
import ImgLink from "../ImgLink"

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
          <IconText
            text="Play"
            icon="play_arrow"
            iconClassName={bem("cover-button-icon")}
            className={bem("cover-top-left", "cover-button")}
          />
          <IconText
            text="Queue"
            icon="queue_music"
            iconClassName={bem("cover-button-icon")}
            className={bem("cover-top-right", "cover-button")}
          />
          <IconText
            text="Album"
            icon="album"
            iconClassName={bem("cover-button-icon")}
            className={bem("cover-bottom-left", "cover-button")}
          />
          <IconText
            text="Delete"
            icon="delete"
            iconClassName={bem("cover-button-icon")}
            className={bem("cover-bottom-right", "cover-button")}
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
