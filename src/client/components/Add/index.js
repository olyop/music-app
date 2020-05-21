import React, { useState } from "react"

import Spinner from "../Spinner"
import AddSongs from "./AddSongs"
import AddAlbum from "./AddAlbum"
import ApiError from "../ApiError"
import AddButton from "./AddButton"

import { isNull } from "lodash"
import reactBem from "@oly_op/react-bem"

import "./index.scss"

const bem = reactBem("Add")

const Add = () => {
  const [ album, setAlbum ] = useState(null)
  const [ songs, setSongs ] = useState(null)
  const [ error, setError ] = useState(null)
  const [ loading, setLoading ] = useState(false)

  if (error) {
    return <ApiError error={error} />
  } else if (loading) {
    return <Spinner className="Padding" />
  } else if (isNull(songs) && isNull(album)) {
    return (
      <AddButton
        setAlbum={setAlbum}
        setSongs={setSongs}
        setError={setError}
        setLoading={setLoading}
      />
    )
  } else {
    return (
      <div className={bem("", "Padding")}>
        <AddAlbum
          album={album}
          setAlbum={setAlbum}
        />
        <AddSongs
          songs={songs}
          setSongs={setSongs}
        />
      </div>
    )
  }
}

export default Add
