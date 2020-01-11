import React, { Fragment } from "react"

import Loading from "../Loading"
import ApiError from "../ApiError"
import SongTable from "../SongTable"
import SongsTable from "../SongsTable"

import { isUndefined } from "lodash"
import reactBem from "@oly_op/react-bem"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/react-hooks"

import GET_GENRE_PAGE from "../../graphql/queries/getGenrePage.graphql"

import "./GenrePage.scss"

const bem = reactBem("GenrePage")

const GenrePage = () => {
  const { id } = useParams()
  const queryOptions = { variables: { id } }
  const { loading, error, data } = useQuery(GET_GENRE_PAGE, queryOptions)
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const columnsIgnore = ["cover","trackNumber","released"]
    return (
      <div className={bem("")}>
        <SongsTable
          columnsToIgnore={columnsIgnore}
          children={(
            <Fragment>
              {data.genre.songs.map(
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
