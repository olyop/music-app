import React, { useState } from "react"

// import {
//   pipe,
//   determineDiscs,
//   determineConcat,
//   deserializeDuration,
// } from "../../helpers"

import Img from "../Img"
// import Icon from "../Icon"
// import Button from "../Button"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import AddAlbumItem from "./AddAlbumItem"
import AddAlbumReleased from "./AddAlbumReleased"

import { isNull } from "lodash"
import getMetadata from "./getMetadata"
import reactBem from "@oly_op/react-bem"
// import { orderBy, map } from "lodash/fp"
import determineAlbum from "./determineAlbum"

import "./index.scss"

const bem = reactBem("AddAlbum")

const AddAlbum = () => {
  const [ songs, setSongs ] = useState(null)
  const [ error, setError ] = useState(null)
  const [ loading, setLoading ] = useState(false)

  const toggleLoading = () =>
    setLoading(prevState => !prevState)

  // const clear = () =>
  //   setSongs(null)

  const handleNewFiles = event => {
    toggleLoading()
    getMetadata(event.target.files)
      .then(setSongs)
      .catch(setError)
      .finally(toggleLoading)
  }

  if (error) {
    return <ApiError error={error} />
  } else if (loading) {
    return <Spinner/>
  } else if (isNull(songs)) {
    return (
      <input
        multiple
        type="file"
        onChange={handleNewFiles}
        title="Select audio files"
        className={bem("add", "Margin")}
      />
    )
  }

  const album = determineAlbum(songs)

  return (
    <div className={bem("", "Padding")}>
      <div>
        <Img
          url={album.cover}
          className={bem("album-cover", "MarginBottom Card Elevated")}
        />
        <h1
          children={album.title}
          className={bem("album-title", "MarginBottomHalf")}
        />
        <div className={bem("list", "MarginBottomHalf")}>
          {album.artists.map(
            artist => (
              <AddAlbumItem
                key={artist}
                query={artist}
                docType="artist"
              />
            ),
          )}
        </div>
        <AddAlbumReleased album={album.title} artist={album.artists.join(", ")}>
          {released => <p className="Text">{released}</p>}
        </AddAlbumReleased>
      </div>
      {/* <div>
        {pipe(songs)(
          orderBy(["discNumber","trackNumber"], ["asc","asc"]),
          determineDiscs,
          map(disc => (
            <div className="Elevated MarginBottom" key={disc.number}>
              {disc.songs.map(song => (
                <div
                  key={song.trackNumber}
                  className={bem("item", "PaddingHalf ItemBorder Hover")}
                >
                  <div>
                    <div className={bem("item-upper", "text", "Text")}>
                      <p className={bem("item-upper-num")}>
                        {song.trackNumber}
                        <Fragment>.</Fragment>
                      </p>
                      <div
                        contentEditable
                        children={song.title}
                        className={bem("item-upper-input", "text", "input")}
                      />
                      <Icon
                        icon="add"
                        className={bem("plus")}
                      />
                    </div>
                    <p className={bem("item-lower", "text")}>
                      {song.artists.map(
                        (artist, index) => (
                          <Fragment>
                            <span
                              key={artist}
                              contentEditable
                              children={artist}
                              className={bem("input", "text", "Text")}
                            />
                            <span>{determineConcat(song.artists, index)}</span>
                          </Fragment>
                        ),
                      )}
                      <Icon
                        icon="add"
                        className={bem("plus")}
                      />
                    </p>
                    <div className={bem("item-lower", "text")}>
                      <div
                        contentEditable
                        className={bem("input", "Text")}
                        children={song.genres.join(", ")}
                      />
                      <Icon
                        icon="add"
                        className={bem("plus")}
                      />
                    </div>
                  </div>
                  <p className={bem("item-right", "Text")}>
                    {deserializeDuration(song.duration)}
                  </p>
                </div>
              ))}
            </div>
          )),
        )}
        <Button
          text="Clear"
          onClick={clear}
        />
      </div> */}
    </div>
  )
}

export default AddAlbum
