import React, { Fragment } from "react"

import QueryApi from "../QueryApi"

import reactBem from "@oly_op/react-bem"
import { deserializeDate } from "../../helpers"

import GET_SONG_PLAYS from "../../graphql/queries/getSongPlays.graphql"

import "./index.scss"

const bem = reactBem("PlaysPage")

const PlaysPage = () => (
  <div className={bem("")}>
    <QueryApi
      query={GET_SONG_PLAYS}
      children={
        ({ song }) => (
          <Fragment>
            {song.plays.map(
              play => (
                <p
                  key={play.id}
                  children={deserializeDate(play.dateCreated / 86400)}
                />
              ),
            )}
          </Fragment>
        )
      }
    />
  </div>
)

export default PlaysPage
