import React, { Fragment } from "react"

import Img from "../Img"
import IconText from "../IconText"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"

import "./Cover.scss"

const bem = reactBem("Cover")

const Cover = ({ url, className, imgClassName }) => (
  <Img
    url={url}
    className={bem(
      { ignore: true, className },
      ""
    )}
    imgClassName={bem(
      { ignore: true, className: imgClassName },
      "img"
    )}
    children={(
      <Fragment>
        <IconText
          text="Play"
          icon="play_arrow"
          iconClassName={bem("button-icon")}
          className={bem("button-top-left","button")}
        />
        <IconText
          text="Queue"
          icon="queue_music"
          iconClassName={bem("button-icon")}
          className={bem("button-top-right","button")}
        />
        <IconText
          text="Next"
          icon="playlist_add"
          iconClassName={bem("button-icon")}
          className={bem("button-bottom-left","button")}
        />
        <IconText
          text="Shuffle"
          icon="shuffle"
          iconClassName={bem("button-icon")}
          className={bem("button-bottom-right","button")}
        />
        <div className={bem("black-box")} />
      </Fragment>
    )}
  />
)

Cover.propTypes = propTypes
Cover.defaultProps = defaultProps

export default Cover
