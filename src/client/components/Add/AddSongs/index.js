import React from "react"

import AddSong from "../AddSong"
import AddFile from "../AddFile"

import { noop } from "lodash"
import reactBem from "@oly_op/react-bem"
import { orderBy, map, sumBy } from "lodash/fp"
import { object, arrayOf, func } from "prop-types"
import { pipe, deserializeDuration } from "../../../helpers"

import "./index.scss"

const bem = reactBem("AddSongs")

const AddSongs = ({ songs, setSongs }) => {
  const handleChange = ({ id }) => value =>
    setSongs(map(song => (song.id === id ? value : song)))
  return (
    <div>
      <div className="Elevated MarginBottomThreeQuart">
        {pipe(songs)(
          orderBy(["discNumber", "trackNumber"], ["asc", "asc"]),
          map(song => (
            <AddSong
              song={song}
              key={song.id}
              className="ItemBorder"
              handleChange={handleChange(song)}
            />
          )),
        )}
      </div>
      <AddFile
        text="Add"
        icon="add"
        handleChange={noop}
        className={bem("add", "MarginBottomThreeQuart")}
      />
      <p className={bem("total", "Text")}>
        {pipe(songs)(
          sumBy("duration"),
          deserializeDuration,
        )}
      </p>
    </div>
  )
}

AddSongs.propTypes = {
  setSongs: func.isRequired,
  songs: arrayOf(object).isRequired,
}

export default AddSongs
