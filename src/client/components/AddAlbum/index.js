import React, { useState } from "react"

import Spinner from "../Spinner"
import ApiError from "../ApiError"
import Text from "./AddAlbumText"
import List from "./AddAlbumList"
import Cover from "./AddAlbumCover"

import { isNull } from "lodash"
import reactBem from "@oly_op/react-bem"
import { isNotEmpty } from "./validators"
import getMetadata from "./helpers/getMetadata"
import handleMetadata from "./helpers/handleMetadata"

import "./index.scss"

const bem = reactBem("AddAlbum")

const AddAlbum = () => {
  const [ album, setAlbum ] = useState(null)
  const [ songs, setSongs ] = useState(null)
  const [ error, setError ] = useState(null)
  const [ loading, setLoading ] = useState(false)

  const toggleLoading = () =>
    setLoading(prevState => !prevState)

  const handleNewFiles = event => {
    toggleLoading()
    getMetadata(event.target.files)
      .then(handleMetadata(setAlbum, setSongs))
      .catch(setError)
      .finally(toggleLoading)
  }

  if (error) {
    return <ApiError error={error} />
  } else if (loading) {
    return <Spinner/>
  } else if (isNull(songs) && isNull(album)) {
    return (
      <input
        multiple
        type="file"
        accept=".mp3"
        onChange={handleNewFiles}
        title="Select audio files"
        className={bem("add", "Margin")}
      />
    )
  }

  const handleAlbumCover = event => {
    const { files } = event.target
    setAlbum(prevState => ({
      ...prevState,
      cover: files[0],
    }))
  }

  return (
    <div className={bem("", "Padding")}>
      <div className={bem("left")}>
        <Cover
          album={album}
          handleChange={handleAlbumCover}
        />
        <Text
          objKey="title"
          val={album.title}
          setState={setAlbum}
          textClassName={bem("title")}
          className="MarginBottomQuart"
          validator={val => isNotEmpty(val)}
        />
        <List
          objKey="artists"
          val={album.artists}
          setState={setAlbum}
          validator={Array.isArray}
          className="MarginBottomQuart"
        />
        <Text
          objKey="released"
          setState={setAlbum}
          val={album.released}
          validator={val => !isNaN(Date.parse(val)) && Date.parse(val) <= Date.now()}
        />
      </div>
    </div>
  )
}

export default AddAlbum
