import React, { Fragment } from "react"

import Img from "../Img"
import DocLink from "../DocLink"
import IconText from "../IconText"
import DocLinks from "../DocLinks"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"
import { catalogUrl } from "../../helpers/misc"

import "./Album.scss"

const bem = reactBem("Album")
const bemLibrary = reactBem("Library")

const Album = ({ album }) => {
  const { id, artists } = album
  return (
    <div className={bem("")}>
      <Img
        url={catalogUrl(id)}
        className={bemLibrary("grid-cover")}
        imgClassName={bemLibrary("grid-cover-img")}
        children={(
          <Fragment>
            <IconText
              text="Play"
              icon="play_arrow"
              iconClassName={bemLibrary("grid-cover-button-icon")}
              className={bemLibrary("grid-cover-button-top-left","grid-cover-button")}
            />
            <IconText
              text="Queue"
              icon="queue_music"
              iconClassName={bemLibrary("grid-cover-button-icon")}
              className={bemLibrary("grid-cover-button-top-right","grid-cover-button")}
            />
            <IconText
              text="Next"
              icon="playlist_add"
              iconClassName={bemLibrary("grid-cover-button-icon")}
              className={bemLibrary("grid-cover-button-bottom-left","grid-cover-button")}
            />
            <IconText
              text="Shuffle"
              icon="shuffle"
              iconClassName={bemLibrary("grid-cover-button-icon")}
              className={bemLibrary("grid-cover-button-bottom-right","grid-cover-button")}
            />
            <div className={bemLibrary("grid-cover-black-box")} />
          </Fragment>
        )}
      />
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
