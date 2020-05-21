import React from "react"

import { func } from "prop-types"
import reactBem from "@oly_op/react-bem"
import getMetadata from "../helpers/getMetadata"
import handleMetadata from "../helpers/handleMetadata"

import "./index.scss"

const bem = reactBem("AddButton")

const AddButton = ({
  setAlbum, setSongs, setError, setLoading,
}) => {

  const toggleLoading = () =>
    setLoading(prevState => !prevState)

  const handleNewFiles = event => {
    toggleLoading()
    getMetadata(event.target.files)
      .then(handleMetadata(setAlbum, setSongs))
      .catch(setError)
      .finally(toggleLoading)
  }

  return (
    <input
      multiple
      type="file"
      accept=".mp3"
      onChange={handleNewFiles}
      title="Select audio files"
      className={bem("", "Margin")}
    />
  )
}

AddButton.propTypes = {
  setAlbum: func.isRequired,
  setSongs: func.isRequired,
  setError: func.isRequired,
  setLoading: func.isRequired,
}

export default AddButton
