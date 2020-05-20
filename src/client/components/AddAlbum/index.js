import React, { useState } from "react"

import Spinner from "../Spinner"
import ApiError from "../ApiError"
import AddAlbumText from "./AddAlbumText"
import AddAlbumList from "./AddAlbumList"
import AddAlbumCover from "./AddAlbumCover"

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

  const handleCoverChange = cover =>
    setAlbum(prevState => ({
      ...prevState,
      cover,
    }))

  const handleTextChange = (setState, objKey) => value =>
    setState(prevState => ({
      ...prevState,
      [objKey]: value,
    }))

  const handleListChange = (setState, objKey) => ({ id }) => value =>
    setState(prevState => ({
      ...prevState,
      [objKey]: prevState[objKey].map(
        item => (item.id === id ? { id, val: value } : item),
      ),
    }))

  return (
    <div className={bem("", "Padding")}>
      <div className={bem("left")}>
        <AddAlbumCover
          album={album}
          handleChange={handleCoverChange}
        />
        <AddAlbumText
          name="title"
          val={album.title}
          textClassName={bem("title")}
          className="MarginBottomThreeQuart"
          validator={val => isNotEmpty(val)}
          handleChange={handleTextChange(setAlbum, "title")}
        />
        <AddAlbumText
          name="released"
          val={album.released}
          className="MarginBottomThreeQuart"
          handleChange={handleTextChange(setAlbum, "released")}
          validator={val => !isNaN(Date.parse(val)) && Date.parse(val) <= Date.now()}
        />
        <AddAlbumList
          name="artists"
          val={album.artists}
          validator={Array.isArray}
          handleChange={handleListChange(setAlbum, "artists")}
        />
      </div>
    </div>
  )
}

export default AddAlbum
