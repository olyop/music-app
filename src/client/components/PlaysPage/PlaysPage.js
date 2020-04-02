import React, { useContext } from "react"

import Spinner from "../Spinner"
import ApiError from "../ApiError"
import UserContext from "../../contexts/User"

import { isUndefined } from "lodash"
import reactBem from "@oly_op/react-bem"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/react-hooks"
import { deserializeDate } from "../../helpers"

import GET_SONG_PLAYS from "../../graphql/queries/getSongPlays.graphql"

import "./PlaysPage.scss"

const bem = reactBem("PlaysPage")

const PlaysPage = () => {
  const { id: songId } = useParams()
  const userId = useContext(UserContext)
  const variables = { userId, songId }
  const { loading, error, data } = useQuery(GET_SONG_PLAYS, { variables })
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError error={error} />
  } else {
    return (
      <div className={bem("")}>
        {data.song.plays.map(
          play => <p key={play.id}>{deserializeDate(play.dateCreated / 86400)}</p>,
        )}
      </div>
    )
  }
}

export default PlaysPage
