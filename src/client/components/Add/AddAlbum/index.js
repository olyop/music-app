import React from "react"

import AddList from "../AddList"
import AddCover from "../AddCover"
import AddLabel from "../AddLabel"
import AddInput from "../AddInput"

import reactBem from "@oly_op/react-bem"
import { object, func } from "prop-types"

import "./index.scss"

const bem = reactBem("AddAlbum")

const AddAlbum = ({ album, setAlbum }) => {

  const handleChange = objKey => val =>
    setAlbum(prevState => ({
      ...prevState,
      [objKey]: val,
    }))

  return (
    <div>
      <AddCover
        album={album}
        handleChange={handleChange("cover")}
        className="MarginBottom Card Elevated"
      />
      <AddLabel
        children="title"
        className="MarginBottomQuart"
      />
      <AddInput
        val={album.title}
        handleChange={handleChange("title")}
        className={bem("title", "MarginBottomThreeQuart")}
      />
      <AddLabel
        children="artists"
        className="MarginBottomQuart"
      />
      <AddList
        val={album.artists}
        className="MarginBottomThreeQuart"
        handleChange={handleChange("artists")}
      />
      <AddLabel
        children="released"
        className="MarginBottomQuart"
      />
      <AddInput
        val={album.released}
        handleChange={handleChange("released")}
      />
    </div>
  )
}

AddAlbum.propTypes = {
  album: object.isRequired,
  setAlbum: func.isRequired,
}

export default AddAlbum
