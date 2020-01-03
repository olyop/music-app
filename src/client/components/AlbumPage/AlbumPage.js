import React, { Fragment } from "react"

import Img from "../Img"
import Loading from "../Loading"
import ApiError from "../ApiError"
import DocLinks from "../DocLinks"
import SongTable from "../SongTable"
import SongsTable from "../SongsTable"

import reactBem from "@oly_op/react-bem"
import ALBUM_PAGE from "./albumPage.graphql"
import { useParams } from "react-router-dom"
import { isUndefined, orderBy } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import { catalogUrl } from "../../helpers/misc"

import "./AlbumPage.scss"

const bem = reactBem("AlbumPage")

const serilaizeAlbumSongs = ({ songs, artists, ...albumBasic }) => (
  songs.map(song => ({ ...song, album: albumBasic }))
)

const AlbumPage = () => {
  const { id } = useParams()
  const queryOptions = { variables: { id } }
  const { loading, error, data } = useQuery(ALBUM_PAGE, queryOptions)
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const { album } = data
    const { title, artists } = album
    const songsOrdered = orderBy(
      serilaizeAlbumSongs(album),
      ["discNumber","trackNumber"],
      ["asc","asc"]
    )
    const columnsIgnore = ["cover","album","released"]
    return (
      <div className={bem("")}>
        <Img
          url={catalogUrl(id)}
          className={bem("cover")}
          imgClassName={bem("img")}
        />
        <div className={bem("main")}>
          <div className={bem("title")}>
            {title}
          </div>
          <div className={bem("artists")}>
            <DocLinks
              path="/artist"
              docs={artists}
              ampersand={false}
            />
          </div>
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

export default AlbumPage
