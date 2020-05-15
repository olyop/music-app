import React, { Fragment } from "react"

import Img from "../Img"
import IconText from "../IconText"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"

import "./index.scss"

const bem = reactBem("Cover")

const Cover = ({ url, landscape, children, className, imgClassName }) => (
  <Img
    url={url}
    imgClassName={bem(imgClassName, "img")}
    className={bem(landscape ? "landscape" : null, className, "")}
    children={(
      <Fragment>
        <IconText
          text="Shuffle"
          icon="shuffle"
          className={bem("button")}
          iconClassName={bem("button-icon")}
          textClassName={bem("button-text")}
        />
        <IconText
          text="Next"
          icon="double_arrow"
          className={bem("button")}
          iconClassName={bem("button-icon")}
          textClassName={bem("button-text")}
        />
        <IconText
          text="Later"
          icon="playlist_add"
          className={bem("button")}
          iconClassName={bem("button-icon")}
          textClassName={bem("button-text")}
        />
        <IconText
          text="Queue"
          icon="queue_music"
          className={bem("button")}
          iconClassName={bem("button-icon")}
          textClassName={bem("button-text")}
        />
        <div className={bem("black-box")} />
        {children}
      </Fragment>
    )}
  />
)

Cover.propTypes = propTypes
Cover.defaultProps = defaultProps

export default Cover
