import React, { Fragment } from "react"

import Img from "../Img"
import Loading from "../Loading"
import ApiError from "../ApiError"
import SongTable from "../SongTable"
import SongsTable from "../SongsTable"

import reactBem from "@oly_op/react-bem"
import { useParams } from "react-router-dom"
import { isUndefined, orderBy } from "lodash"
import ARTIST_PAGE from "./artistPage.graphql"
import { useQuery } from "@apollo/react-hooks"
import { catalogUrl } from "../../helpers/misc"

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
    const songsOrdered = orderBy(songs,["discNumber","trackNumber"],["asc","asc"])
    const columnsToIgnore = ["play","released","trackNumber"]
    return (
      <div className={bem("")}>
        <Img
          url={catalogUrl(id)}
          className={bem("cover")}
          imgClassName={bem("img")}
        />
        <div className={bem("main")}>
          <div className={bem("title")}>
            {name}
          </div>
          <div className={bem("length")}>
            {`${songs.length} song${songs.length === 1 ? "" : "s"}`}
          </div>
          <SongsTable
            className={bem("songs")}
            columnsToIgnore={columnsToIgnore}
            children={(
              <Fragment>
                {songsOrdered.map(
                  song => (
                    <SongTable
                      song={song}
                      key={song.id}
                      className={bem("song")}
                      columnsToIgnore={columnsToIgnore}
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
