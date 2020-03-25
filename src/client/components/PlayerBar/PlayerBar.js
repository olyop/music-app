import React, { useState, useContext } from "react"

import Song from "../Song"
import Icon from "../Icon"
import Spinner from "../Spinner"
import Progress from "../Progress"
import PlayCtx from "../../ctx/Play"
import UserCtx from "../../ctx/User"
import { Link } from "react-router-dom"

import reactBem from "@oly_op/react-bem"
import { useQuery, useMutation } from "@apollo/react-hooks"
import determineUserPrevUpdate from "./determineUserPrevUpdate"
import determineUserNextUpdate from "./determineUserNextUpdate"

import USER_PREV from "../../graphql/mutations/userPrev.graphql"
import USER_NEXT from "../../graphql/mutations/userNext.graphql"
import GET_USER_CURRENT from "../../graphql/queries/getUserCurrent.graphql"
import USER_QUEUES_FRAG from "../../graphql/fragments/userQueuesFrag.graphql"

import "./PlayerBar.scss"

const bem = reactBem("PlayerBar")

const PlayerBar = () => {
  const user = useContext(UserCtx)
  const { play, setPlay } = useContext(PlayCtx)

  const { id: userId } = user
  const variables = { userId }

  const [ current, setCurrent ] = useState(0)
  const { loading, data } = useQuery(GET_USER_CURRENT, { variables })

  const optimisticResponse = (name, updateFunc) => ({
    __typename: "Mutation",
    [name]: {
      id: userId,
      __typename: "User",
      ...updateFunc(user),
    },
  })

  const update = name => (client, result) => {
    client.writeFragment({
      id: userId,
      fragment: USER_QUEUES_FRAG,
      data: { ...result.data[name], __typename: "User" },
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
          {loading ? <Spinner/> : (
            <Song
              showAdd={true}
              song={data.user.current}
            />
          )}
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
          duration={loading ? 0 : data.user.current.duration}
        />
      </div>
    </section>
  )
}

export default PlayerBar
