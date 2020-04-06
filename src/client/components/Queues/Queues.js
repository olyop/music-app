/* eslint-disable react/no-array-index-key */
import React, { useContext } from "react"

import Song from "../Song"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import PlayButton from "../PlayButton"
import UserContext from "../../contexts/User"

import reactBem from "@oly_op/react-bem"
import { useQuery } from "@apollo/react-hooks"
import createQueuesArray from "./createQueuesArray"
import { isUndefined, isEmpty, isNull } from "lodash"

import GET_USER_QUEUES from "../../graphql/queries/getUserQueues.graphql"

import "./Queues.scss"

const bem = reactBem("Queues")

const Queues = () => {
  const userId = useContext(UserContext)

  const { loading, error, data } = useQuery(
    GET_USER_QUEUES,
    { variables: { userId } },
  )

  if (loading) {
    return <Spinner/>
  }

  if (!isUndefined(error)) {
    return <ApiError error={error} />
  }

  return (
    <div className={bem("")}>
      {createQueuesArray(data.user).map(
        queue => {
          if (isNull(queue.songs[0])) {
            return null
          } else if (isEmpty(queue.songs)) {
            return null
          } else {
            return (
              <div key={queue.id} className={bem("section", queue.key)}>
                <p className={bem("section-text")}>{queue.name}</p>
                {queue.songs.map(
                  (song, index) => (
                    <div key={index} className={bem("section-song")}>
                      <PlayButton song={song} className={bem("section-song-playButton")} />
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

export default Queues
