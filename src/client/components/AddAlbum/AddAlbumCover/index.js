import React, { useState, useEffect } from "react"

import Img from "../../Img"
import reactBem from "@oly_op/react-bem"
import { func, instanceOf, shape } from "prop-types"
import { blobToDataUrl } from "../helpers/dataUrlBlobConvert"

import "./index.scss"

const bem = reactBem("AddAlbumCover")

const AddAlbumCover = ({ album, handleChange }) => {
  const [ cover, setCover ] = useState("")
  useEffect(() => {
    blobToDataUrl(album.cover).then(setCover)
  }, [album.cover])
  return (
    <Img
      url={cover}
      imgClassName={bem("img")}
      className={bem("", "MarginBottom Card Elevated")}
    >
      <div
        className={bem("black")}
      />
      <p className={bem("text")}>
        Change
      </p>
      <input
        title=""
        type="file"
        accept=".jpg"
        onChange={handleChange}
        className={bem("button")}
      />
    </Img>
  )
}

AddAlbumCover.propTypes = {
  handleChange: func.isRequired,
  album: shape({
    cover: instanceOf(Blob).isRequired,
  }).isRequired,
}

export default AddAlbumCover
