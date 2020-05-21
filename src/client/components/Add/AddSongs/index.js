import React from "react"

import AddSong from "../AddSong"

import map from "lodash/fp/map.js"
import orderBy from "lodash/fp/orderBy.js"
import { object, arrayOf, func } from "prop-types"
import { pipe, deserializeDuration } from "../../../helpers"

const AddSongs = ({ album, songs, setSongs }) => {

  const handleTextChange = ({ id }) => key => value =>
    setSongs(map(
      song => (song.id === id ? ({
        ...song,
        [key]: value,
      }) : song),
    ))

  return (
    <div>
      <div className="Elevated MarginBottomThreeQuart">
        {pipe(songs)(
          orderBy(["discNumber", "trackNumber"], ["asc", "asc"]),
          map(song => (
            <AddSong
              song={song}
              key={song.id}
              handleText={handleTextChange(song)}
            />
          )),
        )}
      </div>
      <p className="Text">
        {deserializeDuration(album.duration)}
      </p>
    </div>
  )
}

AddSongs.propTypes = {
  album: object.isRequired,
  setSongs: func.isRequired,
  songs: arrayOf(object).isRequired,
}

export default AddSongs
