import React, { useContext } from "react"

import Icon from "../Icon"
import PlayCtx from "../../ctx/Play"
import NowPlaying from "../NowPlaying"
import { Link } from "react-router-dom"

import reactBem from "@oly_op/react-bem"

import "./Player.scss"

const bem = reactBem("Player")

const Player = () => {
  const { play, togglePlay } = useContext(PlayCtx)
  const playIcon = play ? "play_arrow" : "pause"
  const handlePlayClick = () => togglePlay(!play)
  return (
    <section className={bem("")}>
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
            icon={playIcon}
            className={bem("icon")}
            onClick={handlePlayClick}
          />
          <Icon
            icon="skip_next"
            className={bem("icon")}
          />
        </div>
        <div className={bem("right")}>
          <NowPlaying/>
          <Link
            to="/user/queue"
            className={bem("link")}
            children={(
              <Icon
                icon="queue_music"
                className={bem("icon")}
              />
            )}
          />
        </div>
      </div>
    </section>
  )
}

export default Player
