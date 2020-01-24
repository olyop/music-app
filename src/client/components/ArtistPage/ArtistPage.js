import React, { Fragment } from "react"

import Cover from "../Cover"
import Album from "../Album"
import Albums from "../Albums"
import Loading from "../Loading"
import ApiError from "../ApiError"
import SongsTable from "../SongsTable"

import { isUndefined } from "lodash"
import reactBem from "@oly_op/react-bem"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/react-hooks"
import { catalogUrl } from "../../helpers/misc"

import GET_ARTIST_PAGE from "../../graphql/queries/getArtistPage.graphql"

import "./ArtistPage.scss"

const bem = reactBem("ArtistPage")

const ArtistPage = () => {
  const { id } = useParams()
  const queryOptions = { variables: { id } }
  const { loading, error, data } = useQuery(GET_ARTIST_PAGE, queryOptions)
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const { name, songs, albums } = data.artist
    return (
      <div className={bem("")}>
        {name === "Various Artists" ? null : (
          <Cover
            url={catalogUrl(id)}
            className={bem("cover")}
            imgClassName={bem("cover-img")}
          />
        )}
        <div className={bem("main")}>
          <h2 className={bem("title")}>
            {name}
          </h2>
          <div className={bem("length")}>
            {songs.length}
            <Fragment> songs</Fragment>
            <Fragment>, </Fragment>
            {albums.length}
            <Fragment> albums</Fragment>
          </div>
          {albums.length === 0 ? null : (
            <Albums className={bem("albums")}>
              {albums.map(
                album => (
                  <Album
                    album={album}
                    key={album.id}
                  />
                )
              )}
            </Albums>
          )}
          {songs.length === 0 ? null : (
            <div className={bem("songs")}>
              <SongsTable
                songs={songs}
                columnsToIgnore={["cover","trackNumber"]}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default ArtistPage
