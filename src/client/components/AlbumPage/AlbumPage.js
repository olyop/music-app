import React, { Fragment } from "react"

import Cover from "../Cover"
import Loading from "../Loading"
import ApiError from "../ApiError"
import DocLinks from "../DocLinks"
import SongTable from "../SongTable"
import SongsTable from "../SongsTable"

import { isUndefined } from "lodash"
import reactBem from "@oly_op/react-bem"
import ALBUM_PAGE from "./albumPage.graphql"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/react-hooks"
import { catalogUrl } from "../../helpers/misc"
import deserializeDate from "../../helpers/deserializeDate"

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
    const { title, released, artists } = album
    const songs = serilaizeAlbumSongs(album)
    const columnsIgnore = ["cover","album","released"]
    return (
      <div className={bem("")}>
        <Cover
          url={catalogUrl(id)}
          className={bem("cover")}
        />
        <div className={bem("main")}>
          <div className={bem("title")}>{title}</div>
          <div className={bem("artists")}>
            <DocLinks
              path="/artist"
              docs={artists}
              ampersand={true}
            />
            <Fragment> - </Fragment>
            {deserializeDate(released)}
          </div>
          <SongsTable
            className={bem("songs")}
            columnsToIgnore={columnsIgnore}
            children={(
              <Fragment>
                {songs.map(
                  song => (
                    <SongTable
                      song={song}
                      key={song.id}
                      inLibrary={false}
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
