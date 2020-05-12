import React, { useState, Fragment } from "react"

import Img from "../Img"
import List from "../List"
import Icon from "../Icon"
import Artist from "../Artist"
import Spinner from "../Spinner"
import IconText from "../IconText"

import { pipe } from "../../helpers"
import createSong from "./createSong"
import createAlbum from "./createAlbum"
import createFiles from "./createFiles"
import reactBem from "@oly_op/react-bem"
import { isNull, orderBy } from "lodash"
import createArtists from "./createArtists"
import { map, flatten, uniq } from "lodash/fp"
import { useApolloClient } from "react-apollo"

import GET_ARTIST_SEARCH from "../../graphql/queries/getArtistSearch.gql"

import "./index.scss"

const bem = reactBem("Record")

const Record = () => {
  const client = useApolloClient()
  const [ songs, setSongs ] = useState(null)
  const [ album, setAlbum ] = useState(null)
  const [ error, setError ] = useState(null)
  const [ artists, setArtists ] = useState(null)
  const [ loading, setLoading ] = useState(false)

  const toggleLoading = () =>
    setLoading(currentLoading => !currentLoading)

  const handleError = err => {
    console.error(err)
    setError(err)
  }

  const handleNewArtists = files =>
    new Promise(
      (resolve, reject) => {
        Promise
          .all(pipe(files)(createArtists, map(
            artist => client.query({
              query: GET_ARTIST_SEARCH,
              variables: { query: artist },
            }),
          )))
          .then(map(({ data }) => data.artistSearch))
          .then(flatten)
          .then(uniq)
          .then(setArtists)
          .then(resolve)
          .catch(reject)
      },
    )

  const handleNewFiles = async event => {
    try {
      toggleLoading()
      const files = await createFiles(event.target.files)
      setAlbum(createAlbum(files))
      setSongs(files.map(createSong))
      await handleNewArtists(files)
    } catch (err) {
      handleError(err)
    } finally {
      toggleLoading()
    }
  }

  const clearSongs = () =>
    setSongs(null)

  return (
    <div className={bem("", "Padding")}>
      {error ? (
        <pre className="Text">
          {error.stack}
        </pre>
      ) : <Fragment>
        {loading ? <Spinner/> : (isNull(songs) ? (
          <div className={bem("add", "PaddingDouble")}>
            <Icon
              icon="album"
              className={bem("add-cover")}
            />
            <h1
              children="Add Album"
              className={bem("add-text")}
            />
            <label className={bem("add-label")}>
              <IconText
                icon="add"
                text="Select files"
                className={bem("add-button", "Card", "Elevated")}
              />
              <input
                multiple
                type="file"
                title="Select files"
                onChange={handleNewFiles}
                className={bem("add-input")}
              />
            </label>
          </div>
        ) : (
          <div>
            <div className="MarginBottom">
              <Img className={bem("cover", "MarginBottom")} url={album.cover} />
              <h1 className="Text">{album.title}</h1>
              <p className="Text">{JSON.stringify(album.artists)}</p>
            </div>
            <div className="Elevated MarginBottom">
              {orderBy(songs, ["discNumber", "trackNumber"], ["asc", "asc"]).map(
                song => (
                  <div className="PaddingHalf ItemBorder Hover" key={song.songId}>
                    <p className="Text">{song.title}</p>
                    <p className="Text">{JSON.stringify(song.genres)}</p>
                    <p className="Text">{JSON.stringify(song.artists)}</p>
                    <p className="Text">{JSON.stringify(song.remixers)}</p>
                    <p className="Text">{JSON.stringify(song.featuring)}</p>
                  </div>
                ),
              )}
            </div>
            <div className={bem("MarginBottom")}>
              <List>
                {artists.map(
                  artist => (
                    <Artist
                      artist={artist}
                      key={artist.artistId}
                    />
                  ),
                )}
              </List>
            </div>
            <button
              type="button"
              children="Clear"
              onClick={clearSongs}
              className="Text PaddingHalf Button Hover"
            />
          </div>
        ))}
      </Fragment>}
    </div>
  )
}

export default Record
