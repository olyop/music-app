import React, { useContext } from "react"

import Loading from "../Loading"
import ApiError from "../ApiError"
import SongsTable from "../SongsTable"
import UserContext from "../../contexts/User"

import { isUndefined } from "lodash"
import reactBem from "@oly_op/react-bem"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/react-hooks"

import GET_GENRE_PAGE from "../../graphql/queries/getGenrePage.graphql"

import "./GenrePage.scss"

const bem = reactBem("GenrePage")

const GenrePage = () => {

  const { id: genreId } = useParams()
  const userId = useContext(UserContext)

  const { loading, error, data } = useQuery(
    GET_GENRE_PAGE,
    { variables: { genreId, userId } },
  )

  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const { name, songs } = data.genre
    return (
      <div className={bem("")}>
        <h1 className={bem("name")}>{name}</h1>
        <div className={bem("songs")}>
          <SongsTable
            songs={songs}
            orderByInit={{ field: "title", order: true }}
            columnsToIgnore={["numOfPlays", "trackNumber", "released", "dateCreated"]}
          />
        </div>
      </div>
    )
  }
}

export default GenrePage
