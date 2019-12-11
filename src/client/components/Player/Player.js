import React from "react"

import Icon from "../Icon"
import Song from "../Song"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./Player.scss"

const bem = reactBem("Player")

const Player = ({ song }) => (
  <div className={bem("")}>
    <div className={bem("left")}>
      <Icon
        icon="skip_previous"
        className={bem("prev","icon")}
      />
      <Icon
        icon="pause"
        className={bem("playPause","icon")}
      />
      <Icon
        icon="skip_next"
        className={bem("next","icon")}
      />
    </div>
    <div className={bem("right")}>
      <Song song={song} />
    </div>
  </div>
)

Player.propTypes = propTypes

export default Player
