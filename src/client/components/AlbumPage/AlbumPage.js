import React, { Fragment } from "react"

import Cover from "../Cover"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import DocLinks from "../DocLinks"
import SongsTable from "../SongsTable"
import AddToLibrary from "../AddToLibrary"

import { isUndefined } from "lodash"
import reactBem from "@oly_op/react-bem"
import { useParams } from "react-router-dom"
import songsWithAlbum from "./songsWithAlbum"
import determineDiscs from "./determineDiscs"
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
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const { album } = data
    const { title, released, artists } = album
    const songs = songsWithAlbum(album.songs, album)
    const discs = determineDiscs(songs)
    return (
      <div className={bem("")}>
        <Cover
          url={catalogUrl(album)}
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
          <h4 className={bem("artists")}>
            {artists[0].name === "Various Artists" ? artists[0].name : (
              <DocLinks
                path="/artist"
                docs={artists}
                ampersand={true}
              />
            )}
            <Fragment> - </Fragment>
            {deserializeDate(released)}
          </h4>
          <h3 className={bem("genres")}>
            <DocLinks
              path="/genre"
              ampersand={true}
              docs={genresFromAlbum(album)}
            />
          </h3>
          {discs.length === 1 ? (
            <SongsTable
              songs={discs[0].songs}
              orderByInit={{ field: "trackNumber", order: true }}
              columnsToIgnore={["album","cover","plays","released"]}
            />
          ) : (
            <div className={bem("discs")}>
              {discs.map(
                disc => (
                  <div key={disc.number} className={bem("disc")}>
                    <p className={bem("disc-number")}>{`Disc ${disc.number}`}</p>
                    <SongsTable
                      songs={disc.songs}
                      orderByInit={{ field: "trackNumber", order: true }}
                      columnsToIgnore={["album","cover","plays","released"]}
                    />
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default AlbumPage
