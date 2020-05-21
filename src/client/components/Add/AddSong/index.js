import React from "react"

import AddText from "../AddText"
import AddInput from "../AddInput"

import { isString } from "lodash"
import reactBem from "@oly_op/react-bem"
import { isNotEmpty } from "../helpers/validators"
import { deserializeDuration } from "../../../helpers"
import { shape, string, func, number } from "prop-types"

import "./index.scss"

const bem = reactBem("AddSong")

const AddSong = ({ song, handleText }) => {
  return (
    <div className={bem("", "Hover", "PaddingHalf")}>
      <div className={bem("main")}>
        <div className={bem("main-left")}>
          <div className={bem("main-trackNumber")}>
            <AddInput
              type="number"
              val={song.trackNumber}
              handleChange={handleText("trackNumber")}
              className={bem("main-trackNumber-input")}
            />
            <p className={bem("main-trackNumber-dot")}>.</p>
          </div>
          <AddText
            hideLabel
            val={song.title}
            validator={isNotEmpty}
            className={bem("main-text")}
            handleChange={handleText("title")}
          />
        </div>
        <div className={bem("main-right")}>
          <AddText
            hideLabel
            val={song.mix}
            placeholder="Mix"
            validator={isString}
            className={bem("main-mix")}
            handleChange={handleText("mix")}
            inputClassName={bem("main-mix-input")}
          />
          <p className={bem("main-duration", "Text")}>
            {deserializeDuration(song.duration)}
          </p>
        </div>
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
