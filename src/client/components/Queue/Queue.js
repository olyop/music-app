import React, { useContext } from "react"

import Song from "../Song"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import UserCtx from "../../ctx/User"

import { isUndefined, uniqueId } from "lodash"
import { useQuery, useApolloClient } from "@apollo/react-hooks"

import GET_USER_QUEUES from "../../graphql/queries/getUserQueues.graphql"
import USER_QUEUES_FRAG from "../../graphql/fragments/userQueuesFrag.graphql"

import reactBem from "@oly_op/react-bem"

import "./Queue.scss"

const bem = reactBem("Queue")

const createQueueArray = (prev, nowPlaying, next, later) => [
  { id: uniqueId(), key: "prev", name: "Previous", queue: prev },
  { id: uniqueId(), key: "nowPlaying", name: "Current", queue: [nowPlaying] },
  { id: uniqueId(), key: "next", name: "Next", queue: next },
  { id: uniqueId(), key: "later", name: "Later", queue: later },
]

const Queue = () => {
  const user = useContext(UserCtx)
  const client = useApolloClient()
  
  const { id } = user
  const query = GET_USER_QUEUES
  const options = { variables: { id } }
  const { loading, error, data } = useQuery(query, options)
  
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const { prev, nowPlaying, next, later } = data.user
    const fragment = USER_QUEUES_FRAG
    const userFrag = { prev, nowPlaying, next, later, __typename: "User" }
    client.writeFragment({ id, fragment, data: userFrag })
    const queues = createQueueArray(prev, nowPlaying, next, later)
    return (
      <div className={bem("")}>
        <div className={bem("prev")}>
          {queues.map(
            queue => (
              <div key={queue.id} className={bem("section", queue.key)}>
                <p className={bem("section-text")}>{queue.name}</p>
                {queue.queue.map(
                  song => (
                    <Song
                      song={song}
                      key={song.id}
                      className={bem("section-song")}
                    />
                  ),
                )}
              </div>
            ),
          )}
        </div>
      </div>
    )
  }
}

export default Queue
