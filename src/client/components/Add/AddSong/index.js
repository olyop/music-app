import React, { Fragment } from "react"

import AddText from "../AddText"

import reactBem from "@oly_op/react-bem"
import { isNotEmpty } from "../helpers/validators"
import { deserializeDuration } from "../../../helpers"
import { shape, string, number, func } from "prop-types"

import "./index.scss"

const bem = reactBem("AddSong")

const AddSong = ({ song, handleText }) => {
  return (
    <div className={bem("", "Hover", "PaddingHalf")}>
      <div className={bem("main")}>
        <div className={bem("main-left")}>
          <p className={bem("main-trackNumber", "Text")}>
            {song.trackNumber}
            <Fragment>.</Fragment>
          </p>
          <AddText
            hideLabel
            val={song.title}
            validator={isNotEmpty}
            className={bem("main-text")}
            handleChange={handleText("title")}
          />
        </div>
        <p className={bem("main-duration", "Text")}>
          {deserializeDuration(song.duration)}
        </p>
      </div>
    </div>
  )
}

AddSong.propTypes = {
  song: shape({
    title: string.isRequired,
    duration: number.isRequired,
    trackNumber: number.isRequired,
  }).isRequired,
  handleText: func.isRequired,
}

export default AddSong
