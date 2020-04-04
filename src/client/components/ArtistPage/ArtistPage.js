import React, { Fragment, useContext } from "react"

import Cover from "../Cover"
import Album from "../Album"
import Albums from "../Albums"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import SongsTable from "../SongsTable"
import AddToLibrary from "../AddToLibrary"
import UserContext from "../../contexts/User"

import reactBem from "@oly_op/react-bem"
import { useParams } from "react-router-dom"
import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import { determinePlural } from "../../helpers"

import GET_ARTIST_PAGE from "../../graphql/queries/getArtistPage.graphql"

import "./ArtistPage.scss"

const bem = reactBem("ArtistPage")

const ArtistPage = () => {
  const { id: artistId } = useParams()
  const userId = useContext(UserContext)

  const { loading, error, data } = useQuery(
    GET_ARTIST_PAGE,
    { variables: { artistId, userId } },
  )

  if (loading) {
    return <Spinner className={bem("spinner")} />
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
        <h2 className={bem("name")}>
          <span className={bem("name-text")}>{name}</span>
          <AddToLibrary
            doc={artist}
            className={bem("name-add")}
          />
        </h2>
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
              columnsToIgnore={["cover","numOfPlays","trackNumber","dateCreated"]}
            />
          </div>
        )}
      </div>
    )
  }
}

export default ArtistPage
