import React from "react"

import Icon from "../Icon"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./Player.scss"

const bem = reactBem("Player")

const Player = ({ song }) => (
  <div className={bem("")}>
    <div className={bem("left")}>
      {console.log(song)}
    </div>
    <div className={bem("middle")}>
      <Icon
        icon="skip_previous"
        className={bem("prev","icon")}
      />
      <Icon
        icon="play_circle_filled"
        className={bem("playPause","icon")}
      />
      <Icon
        icon="skip_next"
        className={bem("next","icon")}
      />
    </div>
    <div className={bem("right")}/>
  </div>
)

Player.propTypes = propTypes

export default Player
