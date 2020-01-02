import React, { useContext } from "react"

import Icon from "../Icon"
import Song from "../Song"
import UserCtx from "../../ctx/user"

import reactBem from "@oly_op/react-bem"

import "./Player.scss"

const bem = reactBem("Player")

const Player = () => {
  const { user, nowPlayingLoading } = useContext(UserCtx)
  return (
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
      <Song
        song={user.nowPlaying}
        className={bem("right")}
        loading={nowPlayingLoading}
      />
    </div>
  )
}

export default Player
