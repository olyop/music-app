import React, { Fragment } from "react"

import Cover from "../Cover"
import Loading from "../Loading"
import ApiError from "../ApiError"
import DocLinks from "../DocLinks"
import SongsTable from "../SongsTable"
import AddToLibrary from "../AddToLibrary"

import { isUndefined } from "lodash"
import reactBem from "@oly_op/react-bem"
import { useParams } from "react-router-dom"
import songsWithAlbum from "./songsWithAlbum"
import { useQuery } from "@apollo/react-hooks"
import { catalogUrl } from "../../helpers/misc"
import genresFromAlbum from "./genresFromAlbum"
import deserializeDate from "../../helpers/deserializeDate"

import GET_ALBUM_PAGE from "../../graphql/queries/getAlbumPage.graphql"

import "./AlbumPage.scss"

const bem = reactBem("AlbumPage")

const AlbumPage = () => {
  const { id } = useParams()
  const queryOptions = { variables: { id } }
  const { loading, error, data } = useQuery(GET_ALBUM_PAGE, queryOptions)
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const { album } = data
    const { title, released, artists, songs } = album
    return (
      <div className={bem("")}>
        <Cover
          url={catalogUrl(id)}
          className={bem("cover")}
        />
        <div className={bem("main")}>
          <h2 className={bem("title")}>
            <span className={bem("title-text")}>{title}</span>
            <AddToLibrary
              doc={album}
              className={bem("title-add")}
            />
          </h2>
          <h3 className={bem("genres")}>
            <DocLinks
              path="/genre"
              ampersand={true}
              docs={genresFromAlbum(album)}
            />
          </h3>
          <h4 className={bem("artists")}>
            <DocLinks
              path="/artist"
              docs={artists}
              ampersand={true}
            />
            <Fragment> - </Fragment>
            {deserializeDate(released)}
          </h4>
          <div className={bem("songs")}>
            <SongsTable
              songs={songsWithAlbum(songs,album)}
              columnsToIgnore={["album","cover","released"]}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default AlbumPage
