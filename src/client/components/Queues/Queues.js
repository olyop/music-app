/* eslint-disable react/no-array-index-key */
import React, { useContext } from "react"

import Song from "../Song"
import PlayButton from "../PlayButton"
import UserContext from "../../contexts/User"

import reactBem from "@oly_op/react-bem"
import { isEmpty, isNull } from "lodash"
import { useApolloClient } from "@apollo/react-hooks"
import createQueuesArray from "./createQueuesArray"

import USER_QUEUES_FRAG from "../../graphql/fragments/userQueuesFrag.graphql"

import "./Queues.scss"

const bem = reactBem("Queues")

const Queues = () => {
  const client = useApolloClient()
  const id = useContext(UserContext)
  const user = client.readFragment({ id, fragment: USER_QUEUES_FRAG })
  return (
    <div className={bem("")}>
      {createQueuesArray(user).map(
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
