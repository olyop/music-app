import React, { useContext, useState } from "react"

import Icon from "../Icon"
import Current from "../Current"
import Progress from "../Progress"
import { Link } from "react-router-dom"
import UserContext from "../../contexts/User"
import PlayContext from "../../contexts/Play"

import { isNull } from "lodash"
import reactBem from "@oly_op/react-bem"
import determineUserPrevUpdate from "./determineUserPrevUpdate"
import determineUserNextUpdate from "./determineUserNextUpdate"
import { useApolloClient, useMutation } from "@apollo/react-hooks"

import USER_PREV from "../../graphql/mutations/userPrev.graphql"
import USER_NEXT from "../../graphql/mutations/userNext.graphql"
import USER_QUEUES_FRAG from "../../graphql/fragments/userQueuesFrag.graphql"

import "./PlayerBar.scss"

const bem = reactBem("PlayerBar")

const PlayerBar = () => {

  const client = useApolloClient()
  const id = useContext(UserContext)
  const user = client.readFragment({ id, fragment: USER_QUEUES_FRAG })

  const variables = { id }

  const optimisticResponse = (name, updateQueueFunc) => ({
    [name]: {
      id,
      __typename: "User",
      ...updateQueueFunc(user),
    },
  })

  const update = name => (proxy, result) => {
    proxy.writeFragment({
      id,
      data: result.data[name],
      fragment: USER_QUEUES_FRAG,
    })
  }

  const [ userPrev ] = useMutation(USER_PREV, {
    variables,
    update: update("userPrev"),
    optimisticResponse: optimisticResponse("userPrev", determineUserPrevUpdate),
  })

  const [ userNext ] = useMutation(USER_NEXT, {
    variables,
    update: update("userNext"),
    optimisticResponse: optimisticResponse("userNext", determineUserNextUpdate),
  })

  const [ current, setCurrent ] = useState(0)
  const { play, setPlay } = useContext(PlayContext)

  const handlePrevClick = () => userPrev()
  const handlePlayClick = () => setPlay(!play)
  const handleNextClick = () => userNext()

  const isCurrent = !isNull(user.current)

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
          {isCurrent ? <Current/> : <div/>}
          <div className={bem("main-info-right")}>
            <Icon
              icon="volume_up"
              className={bem("main-info-right-volume","icon")}
            />
            <Link to="/queues" className={bem("link")}>
              <Icon
                icon="queue_music"
                className={bem("main-info-right-queues","icon")}
              />
            </Link>
            <Link to="/player" className={bem("link")}>
              <Icon
                icon="fullscreen"
                className={bem("main-info-right-fullscreen","icon")}
              />
            </Link>
          </div>
        </div>
        <Progress
          current={current}
          setCurrent={setCurrent}
          duration={isCurrent ? user.current.duration : 0}
        />
      </div>
    </section>
  )
}

export default PlayerBar
