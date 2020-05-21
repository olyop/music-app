import React from "react"

import AddAlbumText from "../AddText"
import AddAlbumList from "../AddList"
import AddAlbumCover from "../AddCover"

import reactBem from "@oly_op/react-bem"
import { object, func } from "prop-types"
import { isNotEmpty } from "../helpers/validators"

import "./index.scss"

const bem = reactBem("AddAlbum")

const AddAlbum = ({ album, setAlbum }) => {

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
      [objKey]: prevState[objKey].map(item => (
        item.id === id ? { id, val: value } : item
      )),
    }))

  return (
    <div>
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
  )
}

AddAlbum.propTypes = {
  album: object.isRequired,
  setAlbum: func.isRequired,
}

export default AddAlbum
