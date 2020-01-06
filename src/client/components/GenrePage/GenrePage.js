import React, { Fragment } from "react"

import Loading from "../Loading"
import ApiError from "../ApiError"
import SongTable from "../SongTable"
import SongsTable from "../SongsTable"

import reactBem from "@oly_op/react-bem"
import GENRE_PAGE from "./genrePage.graphql"
import { useParams } from "react-router-dom"
import { isUndefined, orderBy } from "lodash"
import { useQuery } from "@apollo/react-hooks"

import "./GenrePage.scss"

const bem = reactBem("GenrePage")

const GenrePage = () => {
  const { id } = useParams()
  const queryOptions = { variables: { id } }
  const { loading, error, data } = useQuery(GENRE_PAGE, queryOptions)
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const { songs } = data.genre
    const songsOrdered = orderBy(songs, "title", "asc")
    const columnsIgnore = ["cover","trackNumber","released"]
    return (
      <div className={bem("")}>
        <SongsTable
          columnsToIgnore={columnsIgnore}
          children={(
            <Fragment>
              {songsOrdered.map(
                song => (
                  <SongTable
                    song={song}
                    key={song.id}
                    inLibrary={false}
                    columnsToIgnore={columnsIgnore}
                  />
                )
              )}
            </Fragment>
          )}
        />
      </div>
    )
  }
}

export default GenrePage
