import React, { useState, Fragment } from "react"

import {
  pipe,
  determineDiscs,
  determineConcat,
  deserializeDuration,
} from "../../helpers"

import Img from "../Img"
import Icon from "../Icon"
import Button from "../Button"
import Spinner from "../Spinner"
import ApiError from "../ApiError"

import { isNull } from "lodash"
import { orderBy, map } from "lodash/fp"
import reactBem from "@oly_op/react-bem"
import determineAlbum from "./determineAlbum"
import { useApolloClient } from "react-apollo"

import GET_FILE_METADATA from "../../graphql/queries/getFileMetadata.gql"

import "./index.scss"

const bem = reactBem("AddAlbum")

const AddAlbum = () => {
  const client = useApolloClient()
  const [ songs, setSongs ] = useState(null)
  const [ error, setError ] = useState(null)
  const [ loading, setLoading ] = useState(false)

  const toggleLoading = () =>
    setLoading(currentLoading => !currentLoading)

  const handleNewFiles = async event => {
    toggleLoading()
    const files = Array.from(event.target.files)
    Promise
      .all(files.map(
        file => client.mutate({
          mutation: GET_FILE_METADATA,
          variables: { file },
        }),
      ))
      .then(map.convert({ cap: false })(({ data }, index) => ({
        ...data.parseFileMetadata,
        audio: files[index],
      })))
      .then(setSongs)
      .catch(setError)
      .finally(toggleLoading)
  }

  const clear = () =>
    setSongs(null)

  if (error) {
    return <ApiError error={error} />
  }

  if (loading) {
    return <Spinner/>
  }

  if (isNull(songs)) {
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
    <div className={bem("", "MarginBottom Padding")}>
      <div className="MarginBottom">
        <Img
          url={album.cover}
          className={bem("cover", "MarginBottom Card Elevated")}
        />
        <h1
          className="Text"
          children={album.title}
        />
        <h2
          className="Text"
          children={album.released}
        />
        <p
          className="Text"
          children={album.artists.toString()}
        />
      </div>
      <div>
        {pipe(songs)(
          orderBy(
            ["discNumber","trackNumber"],
            ["asc","asc"],
          ),
          determineDiscs,
          map(disc => (
            <div className="Elevated MarginBottom" key={disc.number}>
              {disc.songs.map(song => (
                <div
                  key={song.trackNumber}
                  className={bem("item", "PaddingHalf ItemBorder Hover")}
                >
                  <div className={bem("item-left")}>
                    <div className={bem("item-left-upper", "text", "Text")}>
                      <p className={bem("item-left-upper-num")}>
                        {song.trackNumber}
                        <Fragment>.</Fragment>
                      </p>
                      <div
                        contentEditable
                        children={song.title}
                        className={bem("item-left-upper-input", "text", "input")}
                      />
                      <Icon
                        icon="add"
                        className={bem("plus")}
                      />
                    </div>
                    <p className={bem("item-left-lower", "text")}>
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
                    <div className={bem("item-left-lower", "text")}>
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
      </div>
    </div>
  )
}

export default AddAlbum
