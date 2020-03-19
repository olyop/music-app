/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react"

import Song from "../Song"
import Icon from "../Icon"
import Spinner from "../Spinner"
import Progress from "../Progress"
import PlayCtx from "../../ctx/Play"
import UserCtx from "../../ctx/User"
import { Link } from "react-router-dom"

import GET_NOW_PLAYING from "../../graphql/queries/getNowPlaying.graphql"

import reactBem from "@oly_op/react-bem"
import { useQuery } from "@apollo/react-hooks"

import "./PlayerBar.scss"

const bem = reactBem("PlayerBar")

const PlayerBar = () => {
  const user = useContext(UserCtx)
  const { play, setPlay } = useContext(PlayCtx)

  const { id } = user
  const variables = { id }

  const [ volume, setVolume ] = useState(50)
  const { loading, data } = useQuery(GET_NOW_PLAYING, { variables })
  
  const handlePlayClick = () => setPlay(!play)

  return (
    <section className={bem("")}>
      <div className={bem("controls")}>
        <Icon
          icon="skip_previous"
          className={bem("icon")}
        />
        <Icon
          className={bem("icon")}
          onClick={handlePlayClick}
          icon={play ? "play_arrow" : "pause"}
        />
        <Icon
          icon="skip_next"
          className={bem("icon")}
        />
      </div>
      <div className={bem("main")}>
        <div className={bem("main-info")}>
          {loading ? <Spinner/> : <Song song={data.user.nowPlaying} />}
          <div className={bem("main-info-right")}/>
        </div>
        <Progress
          position={loading ? 0 : 100}
          duration={loading ? 0 : data.user.nowPlaying.duration}
        />
      </div>
      <Link to="/queue" className={bem("queue","link")}>
        <Icon
          icon="queue_music"
          className={bem("queue-icon","icon")}
        />
      </Link>
      <Link to="/player" className={bem("fullscreen","link")}>
        <Icon
          icon="fullscreen"
          className={bem("fullscreen-icon","icon")}
        />
      </Link>
    </section>
  )
}

export default PlayerBar
