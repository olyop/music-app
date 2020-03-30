import React, { Fragment } from "react"

import Cover from "../Cover"
import Spinner from "../Spinner"
import IconText from "../IconText"
import ApiError from "../ApiError"
import DocLinks from "../DocLinks"
import SongsTable from "../SongsTable"
import AddToLibrary from "../AddToLibrary"

import { isUndefined } from "lodash"
import reactBem from "@oly_op/react-bem"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/react-hooks"
import { deserializeDate } from "../../helpers"
import { songsWithAlbum, determineDiscs, genresFromAlbum } from "./helpers"

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
    const songs = songsWithAlbum(album)
    const discs = determineDiscs(songs)
    return (
      <div className={bem("")}>
        <Cover
          url={album.cover}
          className={bem("cover")}
        />
        <h2 className={bem("title")}>
          <span className={bem("title-text")}>{title}</span>
          <AddToLibrary
            doc={album}
            className={bem("title-add")}
          />
        </h2>
        <h3 className={bem("info")}>
          <DocLinks
            ampersand
            path="/genre"
            docs={genresFromAlbum(album)}
          />
          <Fragment> - </Fragment>
          {deserializeDate(released)}
        </h3>
        <h4 className={bem("artists")}>
          <DocLinks
            ampersand
            path="/artist"
            docs={artists}
          />
        </h4>
        <div className={bem("controls")}>
          <IconText
            text="Shuffle"
            icon="shuffle"
            className={bem("controls-shuffle")}
          />
        </div>
        <div className={bem("discs")}>
          {discs.map(
            disc => (
              <div className={bem("disc")} key={disc.number}>
                {discs.length === 1 ? null : (
                  <p
                    className={bem("disc-number")}
                    children={`Disc ${disc.number}`}
                  />
                )}
                <SongsTable
                  songs={disc.songs}
                  orderByInit={{ field: "trackNumber", order: true }}
                  columnsToIgnore={["album","cover","numOfPlays","released","dateCreated"]}
                />
              </div>
            ),
          )}
        </div>
      </div>
    )
  }
}

export default AlbumPage
