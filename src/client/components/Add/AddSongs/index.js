import React from "react"

import AddSong from "../AddSong"

import { map, sumBy } from "lodash/fp"
import reactBem from "@oly_op/react-bem"
import { object, arrayOf, func } from "prop-types"
import { pipe, deserializeDuration } from "../../../helpers"

import "./index.scss"

const bem = reactBem("AddSongs")

const AddSongs = ({ songs, handleChange }) => {
  const onChange = ({ id }) => value =>
    handleChange(map(song => (song.id === id ? value : song)))
  return (
    <div>
      <div className="Elevated MarginBottomThreeQuart">
        {songs.map(
          song => (
            <AddSong
              song={song}
              key={song.id}
              className="ItemBorder"
              handleChange={onChange(song)}
            />
          ),
        )}
      </div>
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
  handleChange: func.isRequired,
  songs: arrayOf(object).isRequired,
}

export default AddSongs
