import React, { useContext } from "react"

import Song from "../Song"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import UserCtx from "../../ctx/User"
import PlayButton from "../PlayButton"

import { useQuery } from "@apollo/react-hooks"
import { isUndefined, uniqueId, isEmpty } from "lodash"

import GET_USER_QUEUES from "../../graphql/queries/getUserQueues.graphql"

import reactBem from "@oly_op/react-bem"

import "./Queues.scss"

const bem = reactBem("Queues")

const createQueuesArray = ({ prev, current, next, queue }) => [
  { id: uniqueId(), key: "prev", name: "Previous", songs: prev },
  { id: uniqueId(), key: "current", name: "Playing", songs: [current] },
  { id: uniqueId(), key: "next", name: "Next", songs: next },
  { id: uniqueId(), key: "queue", name: "Later", songs: queue },
]

const Queues = () => {
  const user = useContext(UserCtx)

  const { id } = user
  const variables = { id }
  const { loading, error, data } = useQuery(GET_USER_QUEUES, { variables })

  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const queues = createQueuesArray(data.user)
    return (
      <div className={bem("")}>
        {queues.map(
          queue => {
            if (isEmpty(queue.songs)) {
              return null
            } else {
              return (
                <div key={queue.id} className={bem("section", queue.key)}>
                  <p className={bem("section-text")}>{queue.name}</p>
                  {queue.songs.map(
                    song => (
                      <div key={song.id} className={bem("section-song")}>
                        <PlayButton className={bem("section-song-playButton")} song={song} />
                        <Song song={song} />
                      </div>
                    ),
                  )}
                </div>
              )
            }
          },
        )}
      </div>
    )
  }
}

export default Queues
