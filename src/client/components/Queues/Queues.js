import React, { useContext } from "react"

import Song from "../Song"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import PlayButton from "../PlayButton"
import UserContext from "../../context/User"

import reactBem from "@oly_op/react-bem"
import { useQuery } from "@apollo/react-hooks"
import { isUndefined, isEmpty } from "lodash"
import createQueuesArray from "./createQueuesArray"

import GET_USER_QUEUES from "../../graphql/queries/getUserQueues.graphql"

import "./Queues.scss"

const bem = reactBem("Queues")

const Queues = () => {
  const { id } = useContext(UserContext)
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
}

export default Queues
