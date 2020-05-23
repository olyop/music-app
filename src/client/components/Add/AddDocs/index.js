import React from "react"

import AddCover from "../AddCover"

import { noop } from "lodash"
import { object, arrayOf } from "prop-types"
import determineArtists from "./determineArtists"

const AddDocs = ({ album, songs }) => {
  const artists = determineArtists(album, songs)
  return (
    <div>
      {artists.map(
        artist => (
          <div key={artist} className="Elevated Card MarginBottomHalf">
            <AddCover
              landscape
              handleChange={noop}
              img={new Blob([""], { type: "image.jpeg" })}
            />
            <p className="Text PaddingHalf">{artist}</p>
          </div>
        ),
      )}
    </div>
  )
}

AddDocs.propTypes = {
  album: object.isRequired,
  songs: arrayOf(object).isRequired,
}

export default AddDocs
