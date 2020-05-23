import React, { useState } from "react"

import AddDocs from "./AddDocs"
import Spinner from "../Spinner"
import AddSongs from "./AddSongs"
import AddAlbum from "./AddAlbum"
import ApiError from "../ApiError"
import AddButton from "./AddButton"

import reactBem from "@oly_op/react-bem"
import { isNull, orderBy } from "lodash"

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
  }

  const songsOrdered =
    orderBy(songs, ["discNumber", "trackNumber"], ["asc", "asc"])

  return (
    <div className={bem("", "Padding")}>
      <AddAlbum
        album={album}
        handleChange={setAlbum}
        className={bem("album")}
      />
      <AddSongs
        songs={songsOrdered}
        handleChange={setSongs}
      />
      <AddDocs
        album={album}
        songs={songsOrdered}
      />
    </div>
  )
}

export default Add
