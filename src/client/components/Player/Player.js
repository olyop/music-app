import React, { useState, useContext, Fragment } from "react"

import Song from "../Song"
import Icon from "../Icon"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import PlayCtx from "../../ctx/Play"
import UserCtx from "../../ctx/User"
import { Link } from "react-router-dom"
import Slider from "@material-ui/core/Slider"

import GET_NOW_PLAYING from "../../graphql/queries/getNowPlaying.graphql"
import USER_NOW_PLAYING_FRAG from "../../graphql/fragments/userNowPlayingFrag.graphql"

import { isUndefined } from "lodash"
import reactBem from "@oly_op/react-bem"
import { useQuery } from "@apollo/react-hooks"
import determineDuration from "../../helpers/deserializeDuration"

import "./Player.scss"

const bem = reactBem("Player")

const Player = () => {
  const user = useContext(UserCtx)
  const [ volume, setVolume ] = useState(50)
  const { play, setPlay } = useContext(PlayCtx)

  const { id } = user
  const playIcon = play ? "play_arrow" : "pause"
  const queryOptions = { variables: { id } }

  const { loading, error, data, client } = useQuery(GET_NOW_PLAYING, queryOptions)

  const handlePlayClick = () => setPlay(!play)
  const handleVolumeInput = (_, value) => setVolume(value)

  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const { nowPlaying } = data.user
    const { duration } = nowPlaying
    const fragment = USER_NOW_PLAYING_FRAG
    const userFrag = { nowPlaying, __typename: "User" }
    client.writeFragment({ id, fragment, data: userFrag })
    return (
      <section className={bem("")}>
        <div className={bem("timeline")}>
          <input
            min="0"
            max="1"
            step="0.01"
            type="range"
            id="duration"
            name="duration"
            className={bem("timeline-progress")}
          />
        </div>
        <div className={bem("main")}>
          <div className={bem("controls")}>
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
          <div className={bem("info")}>
            <div className={bem("info-left")}>
              <Song song={nowPlaying} />
            </div>
            <div className={bem("info-right")}>
              <div className={bem("info-right-duration")}>
                <Fragment>0 / </Fragment>
                <Fragment>{determineDuration(duration)}</Fragment>
              </div>
              <div className={bem("info-right-volume")}>
                <Slider
                  min={0}
                  max={100}
                  name="volume"
                  value={volume}
                  valueLabelDisplay="auto"
                  onChange={handleVolumeInput}
                />
              </div>
              <Icon
                icon="fullscreen"
                className={bem("info-right-max","icon")}
              />
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
        </div>
      </section>
    )
  }
}

export default Player
