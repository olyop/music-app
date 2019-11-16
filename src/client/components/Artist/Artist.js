import React, { Fragment } from "react"

import { Link } from "react-router-dom"
import IconText from "../IconText"
import DocLink from "../DocLink"
import Img from "../Img"

import reactBem from "@oly_op/react-bem"
import { string } from "prop-types"

import "./Artist.scss"

const bem = reactBem("Artist")
const bemLibrary = reactBem("Library")

const Artist = ({ id, name, artistPhotoUrl }) => (
  <div className={bem("")}>
    <Img
      url={artistPhotoUrl}
      className={bem("cover", { ignore: true, className: bemLibrary("grid-cover") })}
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
          <Link to={`/artist/${id}`}>
            <IconText
              text="Artist"
              icon="person"
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
    <h2 className={bem("name")}>
      <DocLink
        path="/artist"
        doc={{ id, name }}
      />
    </h2>
  </div>
)

Artist.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  artistPhotoUrl: string.isRequired
}

export default Artist
