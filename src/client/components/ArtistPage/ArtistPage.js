import React, { Fragment } from "react"

import Cover from "../Cover"
import Album from "../Album"
import Albums from "../Albums"
import Loading from "../Loading"
import ApiError from "../ApiError"
import SongsTable from "../SongsTable"

import reactBem from "@oly_op/react-bem"
import { useParams } from "react-router-dom"
import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import { determinePlural } from "../../helpers"

import GET_ARTIST_PAGE from "../../graphql/queries/getArtistPage.graphql"

import "./ArtistPage.scss"

const bem = reactBem("ArtistPage")

const ArtistPage = () => {
  const { id } = useParams()
  const variables = { id }
  const { loading, error, data } = useQuery(GET_ARTIST_PAGE, { variables })
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const { artist } = data
    const { name, photo, songs, albums } = artist
    return (
      <div className={bem("")}>
        <Cover
          url={photo}
          className={bem("cover")}
          imgClassName={bem("cover-img")}
        />
        <h2 className={bem("title")}>{name}</h2>
        <div className={bem("length")}>
          {songs.length}
          <Fragment> song</Fragment>
          <Fragment>{determinePlural(songs)}</Fragment>
          {isEmpty(albums) ? null : (
            <Fragment>
              <Fragment>, </Fragment>
              {albums.length}
              <Fragment> album</Fragment>
              <Fragment>{determinePlural(albums)}</Fragment>
            </Fragment>
          )}
        </div>
        {isEmpty(albums) ? null : (
          <Albums className={bem("albums")}>
            {albums.map(
              album => (
                <Album
                  album={album}
                  key={album.id}
                />
              ),
            )}
          </Albums>
        )}
        {isEmpty(songs) ? null : (
          <div className={bem("songs")}>
            <SongsTable
              songs={songs}
              orderByInit={{ field: "title", order: true }}
              columnsToIgnore={["cover","plays","trackNumber","dateCreated"]}
            />
          </div>
        )}
      </div>
    )
  }
}

export default ArtistPage
