import React, { Fragment } from "react"

import Img from "../Img"
import DocLink from "../DocLink"
import IconText from "../IconText"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"
import { catalogUrl } from "../../helpers/misc"

import "./Artist.scss"

const bem = reactBem("Artist")
const bemLibrary = reactBem("Library")

const Artist = ({ artist }) => {
  const { id } = artist
  return (
    <div className={bem("")}>
      <Img
        url={catalogUrl(id)}
        imgClassName={bemLibrary("grid-cover-img")}
        className={bemLibrary({ ignore: true, className: bem("cover") }, "grid-cover")}
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
            <IconText
              text="Next"
              icon="playlist_add"
              iconClassName={bemLibrary("grid-cover-button-icon")}
              className={bemLibrary("grid-cover-button-bottom-left", "grid-cover-button")}
            />
            <IconText
              text="Shuffle"
              icon="shuffle"
              iconClassName={bemLibrary("grid-cover-button-icon")}
              className={bemLibrary("grid-cover-button-bottom-right", "grid-cover-button")}
            />
            <div className={bemLibrary("grid-cover-black-box")} />
          </Fragment>
        )}
      />
      <h2 className={bem("name")}>
        <DocLink
          doc={artist}
          path="/artist"
        />
      </h2>
    </div>
  )
}

Artist.propTypes = propTypes

export default Artist
