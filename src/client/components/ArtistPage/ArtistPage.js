import React from "react"

import Cover from "../Cover"
import Album from "../Album"
import Albums from "../Albums"
import Loading from "../Loading"
import ApiError from "../ApiError"
import SongTable from "../SongTable"
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
    const columnsToIgnore = ["cover","released","trackNumber"]
    return (
      <div className={bem("")}>
        <Cover
          url={catalogUrl(id)}
          className={bem("cover")}
          imgClassName={bem("img")}
        />
        <div className={bem("main")}>
          <div className={bem("title")}>
            {name}
          </div>
          <div className={bem("length")}>
            {`${songs.length} songs`}
          </div>
          {songs.length === 0 ? null : (
            <SongsTable className={bem("songs")} columnsToIgnore={columnsToIgnore}>
              {songs.map(
                song => (
                  <SongTable
                    song={song}
                    key={song.id}
                    className={bem("song")}
                    columnsToIgnore={columnsToIgnore}
                  />
                )
              )}
            </SongsTable>
          )}
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
        </div>
      </div>
    )
  }
}

export default ArtistPage
