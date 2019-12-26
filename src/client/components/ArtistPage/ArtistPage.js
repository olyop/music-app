import React, { Fragment } from "react"

import Img from "../Img"
import Loading from "../Loading"
import ApiError from "../ApiError"
import SongTable from "../SongTable"
import SongsTable from "../SongsTable"

import reactBem from "@oly_op/react-bem"
import { useParams } from "react-router-dom"
import ARTIST_PAGE from "./artistPage.graphql"
import { useQuery } from "@apollo/react-hooks"
import { catalogUrl } from "../../helpers/misc"
import { isUndefined, orderBy, uniqBy } from "lodash"

import "./ArtistPage.scss"

const bem = reactBem("ArtistPage")

const ArtistPage = () => {
  const { id } = useParams()
  const queryOptions = { variables: { id } }
  const { loading, error, data } = useQuery(ARTIST_PAGE, queryOptions)
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const { name, songs } = data.artist
    const songsNoDup = uniqBy(songs, "id")
    const columnsIgnore = ["cover","released","trackNumber"]
    const songsOrdered = orderBy(songsNoDup,["discNumber","trackNumber"],["asc","asc"])
    return (
      <div className={bem("")}>
        <Img
          url={catalogUrl(id)}
          className={bem("cover")}
          imgClassName={bem("img")}
        />
        <div className={bem("main")}>
          <div className={bem("title")}>{name}</div>
          <SongsTable
            className={bem("songs")}
            columnsToIgnore={columnsIgnore}
            children={(
              <Fragment>
                {songsOrdered.map(
                  song => (
                    <SongTable
                      song={song}
                      key={song.id}
                      className={bem("song")}
                      columnsToIgnore={columnsIgnore}
                    />
                  )
                )}
              </Fragment>
            )}
          />
        </div>
      </div>
    )
  }
}

export default ArtistPage
