import React, { useContext, useState } from "react"

import Icon from "../Icon"
import Current from "../Current"
import Progress from "../Progress"
import { Link } from "react-router-dom"
import UserContext from "../../contexts/User"
import PlayContext from "../../contexts/Play"

import reactBem from "@oly_op/react-bem"
import { useMutation } from "@apollo/react-hooks"

import USER_PREV from "../../graphql/mutations/userPrev.graphql"
import USER_NEXT from "../../graphql/mutations/userNext.graphql"
import USER_QUEUES_FRAG from "../../graphql/fragments/userQueuesFrag.graphql"

import "./PlayerBar.scss"

const bem = reactBem("PlayerBar")

const PlayerBar = () => {
  const userId = useContext(UserContext)
  const variables = { userId }

  const update = name => (proxy, result) => {
    proxy.writeFragment({
      variables,
      id: userId,
      data: result.data[name],
      fragment: USER_QUEUES_FRAG,
    })
  }

  const [ userPrev ] = useMutation(USER_PREV, {
    variables,
    update: update("userPrev"),
  })

  const [ userNext ] = useMutation(USER_NEXT, {
    variables,
    update: update("userNext"),
  })

  const [ current, setCurrent ] = useState(0)
  const { play, setPlay } = useContext(PlayContext)

  const handlePrevClick = () => userPrev()
  const handlePlayClick = () => setPlay(!play)
  const handleNextClick = () => userNext()

  return (
    <section className={bem("")}>
      <div className={bem("controls")}>
        <Icon
          icon="skip_previous"
          className={bem("icon")}
          onClick={handlePrevClick}
        />
        <Icon
          className={bem("icon")}
          onClick={handlePlayClick}
          icon={play ? "pause" : "play_arrow"}
        />
        <Icon
          icon="skip_next"
          className={bem("icon")}
          onClick={handleNextClick}
        />
      </div>
      <div className={bem("main")}>
        <div className={bem("main-info")}>
          <Current/>
          <div className={bem("main-info-right")}>
            <Link to="/player" className={bem("link")}>
              <Icon
                icon="fullscreen"
                className={bem("main-info-right-icon", "icon")}
              />
            </Link>
            <Link to="/queues" className={bem("link")}>
              <Icon
                icon="queue_music"
                className={bem("main-info-right-icon", "icon")}
              />
            </Link>
            <Icon
              icon="volume_up"
              className={bem("main-info-right-volume", "icon")}
            />
          </div>
        </div>
        <Progress
          duration={0}
          current={current}
          setCurrent={setCurrent}
        />
      </div>
    </section>
  )
}

export default PlayerBar
