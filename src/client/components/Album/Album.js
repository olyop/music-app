import React, { Fragment } from "react"

import { Link } from "react-router-dom"
import IconText from "../IconText"
import DocLinks from "../DocLinks"
import DocLink from "../DocLink"
import Img from "../Img"

import { string, arrayOf, object } from "prop-types"
import reactBem from "@oly_op/react-bem"

import "./Album.scss"

const bem = reactBem("Album")
const bemLibrary = reactBem("Library")

const Album = ({ id, albumCoverUrl, title, artists }) => (
  <div className={bem("")}>
    <Img
      imgUrl={albumCoverUrl}
      className={bemLibrary("grid-cover")}
      imgClassName={bemLibrary("grid-cover-img")}
      children={(
        <Fragment>
          <IconText
            text="Play"
            icon="play_arrow"
            iconClassName={bemLibrary("grid-cover-button-icon")}
            className={bemLibrary("grid-cover-button-top-left", "grid-cover-button")}
          />
          <IconText
            text="Queue"
            icon="queue_music"
            iconClassName={bemLibrary("grid-cover-button-icon")}
            className={bemLibrary("grid-cover-button-top-right", "grid-cover-button")}
          />
          <Link to={`/album/${id}`}>
            <IconText
              text="Album"
              icon="album"
              iconClassName={bemLibrary("grid-cover-button-icon")}
              className={bemLibrary("grid-cover-button-bottom-left", "grid-cover-button")}
            />
          </Link>
          <IconText
            text="Delete"
            icon="delete"
            iconClassName={bemLibrary("grid-cover-button-icon")}
            className={bemLibrary("grid-cover-button-bottom-right", "grid-cover-button")}
          />
          <div
            className={bemLibrary("grid-cover-black-box")}
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
