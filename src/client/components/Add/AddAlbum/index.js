import React from "react"

import AddList from "../AddList"
import AddCover from "../AddCover"
import AddLabel from "../AddLabel"
import AddInput from "../AddInput"

import reactBem from "@oly_op/react-bem"
import { object, func, string } from "prop-types"

import "./index.scss"

const bem = reactBem("AddAlbum")

const AddAlbum = ({ album, handleChange, className }) => {

  const onChange = objKey => val =>
    handleChange(prevState => ({
      ...prevState,
      [objKey]: val,
    }))

  return (
    <div className={className}>
      <AddCover
        img={album.cover}
        handleChange={onChange("cover")}
        className="MarginBottom Card Elevated"
      />
      <AddLabel
        children="title"
        className="MarginBottomQuart"
      />
      <AddInput
        val={album.title}
        handleChange={onChange("title")}
        className={bem("title", "MarginBottomThreeQuart")}
      />
      <AddLabel
        children="artists"
        className="MarginBottomQuart"
      />
      <AddList
        addText="Artist"
        val={album.artists}
        className="MarginBottomThreeQuart"
        handleChange={onChange("artists")}
      />
      <AddLabel
        children="released"
        className="MarginBottomQuart"
      />
      <AddInput
        val={album.released}
        handleChange={onChange("released")}
      />
    </div>
  )
}

AddAlbum.propTypes = {
  className: string,
  album: object.isRequired,
  handleChange: func.isRequired,
}

AddAlbum.defaultProps = {
  className: null,
}

export default AddAlbum
