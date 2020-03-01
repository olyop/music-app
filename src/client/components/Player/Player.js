import React, { useContext } from "react"

import Icon from "../Icon"
import UserCtx from "../../ctx/User"
import PlayCtx from "../../ctx/Play"
import NowPlaying from "../NowPlaying"
import { Link } from "react-router-dom"

import reactBem from "@oly_op/react-bem"

import "./Player.scss"

const bem = reactBem("Player")

const Player = () => {
  const { id } = useContext(UserCtx)
  const { play, setPlay } = useContext(PlayCtx)
  const icon = play ? "play_arrow" : "pause"
  const togglePlay = () => setPlay(!play)
  return (
    <div className={bem("")}>
      <div className={bem("timeline")}>
        <div className={bem("timeline-progress")}/>
      </div>
      <div className={bem("main")}>
        <div className={bem("left")}>
          <Icon
            icon="skip_previous"
            className={bem("icon")}
          />
          <Icon
            icon={icon}
            onClick={togglePlay}
            className={bem("icon")}
          />
          <Icon
            icon="skip_next"
            className={bem("icon")}
          />
        </div>
        <div className={bem("right")}>
          <NowPlaying/>
          <Link to={`/user/${id}/queue`} className={bem("link")}>
            <Icon
              icon="queue_music"
              className={bem("icon")}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Player
