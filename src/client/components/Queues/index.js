/* eslint-disable react/no-array-index-key */
import React, { Fragment } from "react"

import Song from "../Song"
import QueueApi from "../QueryApi"
import PlayButton from "../PlayButton"

import reactBem from "@oly_op/react-bem"
import { isEmpty, isNull } from "lodash"
import { createQueuesArray } from "../../helpers"

import GET_USER_QUEUES from "../../graphql/queries/getUserQueues.gql"

import "./index.scss"

const bem = reactBem("Queues")

const Queues = () => (
  <div className={bem("")}>
    <QueueApi
      query={GET_USER_QUEUES}
      children={
        ({ user }) => (
          <Fragment>
            {createQueuesArray(user).map(
              queue => (isNull(queue.songs[0]) || isEmpty(queue.songs) ? null : (
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
              )),
            )}
          </Fragment>
        )
      }
    />
  </div>
)

export default Queues
