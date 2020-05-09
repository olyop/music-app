import React, { useState, Fragment } from "react"

import Spinner from "../Spinner"

import { isEmpty } from "lodash"
import createSongs from "./createSongs"
import { deserializeDuration } from "../../helpers"

const Record = () => {

  const [ songs, setSongs ] = useState([])
  const [ error, setError ] = useState(null)
  const [ loading, setLoading ] = useState(false)

  const toggleLoading = () => !setLoading(loading)

  const handleChange = event => {
    setLoading(true)
    createSongs(event.target.files)
      .then(setSongs)
      .catch(setError)
      .finally(toggleLoading)
  }

  return (
    <div className="Padding">
      {error ? (
        <pre className="Text">
          {(() => {
            console.error(error)
            return error.stack
          })()}
        </pre>
      ) : <Fragment>
        {loading ? <Spinner/> : (isEmpty(songs) ? (
          <input
            multiple
            id="record"
            type="file"
            onChange={handleChange}
            className="Text MarginBottom"
          />
        ) : (
          <Fragment>
            <div className="Elevated MarginBottom">
              {songs.map(song => (
                <div className="Text PaddingHalf ItemBorder " key={song.id}>
                  <p>
                    {song.audio.name}
                    <Fragment> - </Fragment>
                    {deserializeDuration(song.duration)}
                  </p>
                  <p>
                    {song.title}
                  </p>
                  <p>
                    {song.header}
                  </p>
                </div>
              ))}
            </div>
            <button
              type="button"
              children="Clear"
              onClick={() => setSongs([])}
              className="Text PaddingHalf Button Hover"
            />
          </Fragment>
        ))}
      </Fragment>}
    </div>
  )
}

export default Record
