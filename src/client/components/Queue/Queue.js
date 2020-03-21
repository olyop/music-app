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

import "./Queue.scss"

const bem = reactBem("Queue")

const createQueueArray = ({ prev, nowPlaying, next, later }) => [
  { id: uniqueId(), key: "prev", name: "Previous", queue: prev },
  { id: uniqueId(), key: "nowPlaying", name: "Now Playing", queue: [nowPlaying] },
  { id: uniqueId(), key: "next", name: "Next", queue: next },
  { id: uniqueId(), key: "later", name: "Later", queue: later },
]

const Queue = () => {
  const user = useContext(UserCtx)

  const { id } = user
  const variables = { id }
  const { loading, error, data } = useQuery(GET_USER_QUEUES, { variables })

  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const queues = createQueueArray(data.user)
    return (
      <div className={bem("")}>
        {queues.map(
          queue => {
            if (isEmpty(queue.queue)) {
              return null
            } else {
              return (
                <div key={queue.id} className={bem("section", queue.key)}>
                  <p className={bem("section-text")}>{queue.name}</p>
                  {queue.queue.map(
                    song => (
                      <div key={song.id} className={bem("section-song")}>
                        <PlayButton
                          song={song}
                          className={bem("section-song-playButton")}
                        />
                        <Song
                          song={song}
                          className={bem("section-song-song")}
                        />
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

export default Queue
