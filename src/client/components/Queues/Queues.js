/* eslint-disable react/no-array-index-key */
import React, { useContext } from "react"

import Song from "../Song"
import PlayButton from "../PlayButton"
import UserContext from "../../contexts/User"

import { isNull, isEmpty } from "lodash"
import reactBem from "@oly_op/react-bem"
import createQueuesArray from "./createQueuesArray"

import "./Queues.scss"

const bem = reactBem("Queues")

const Queues = () => {
  const user = useContext(UserContext)
  const queues = createQueuesArray(user)
  return (
    <div className={bem("")}>
      {queues.map(
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
