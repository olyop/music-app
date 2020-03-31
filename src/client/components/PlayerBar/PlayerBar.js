import React, { useState, useContext, Fragment } from "react"

import Song from "../Song"
import Icon from "../Icon"
import Spinner from "../Spinner"
import Progress from "../Progress"
import { Link } from "react-router-dom"
import UserContext from "../../contexts/User"
import PlayContext from "../../contexts/Play"

import { isNull } from "lodash"
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

  const user = useContext(UserContext)
  const { play, setPlay } = useContext(PlayContext)

  const { id } = user
  const variables = { id }
  const { data, loading } = useQuery(GET_USER_CURRENT, { variables })

  const optimisticResponse = (name, updateFunc) => ({
    [name]: {
      id,
      __typename: "User",
      ...updateFunc(user),
    },
  })

  const update = name => (client, result) => {
    client.writeFragment({
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

  const handlePrevClick = () => userPrev()
  const handlePlayClick = () => setPlay(!play)
  const handleNextClick = () => userNext()

  const isCurrent = !isNull(data.user.current)

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
            <Fragment>
              {isCurrent ? <Song showAdd song={data.user.current} /> : <div/>}
            </Fragment>
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
          duration={loading ? 0 : (isCurrent ? data.user.current.duration : 0)}
        />
      </div>
    </section>
  )
}

export default PlayerBar
