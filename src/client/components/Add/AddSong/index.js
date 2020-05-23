import React from "react"

import AddList from "../AddList"
import AddInput from "../AddInput"

import { isEmpty } from "lodash"
import reactBem from "@oly_op/react-bem"
import { deserializeDuration } from "../../../helpers"
import { shape, string, func, number } from "prop-types"

import "./index.scss"

const bem = reactBem("AddSong")

const AddSong = ({ song, handleChange, className }) => {
  const onChange = key => val =>
    handleChange({ ...song, [key]: val })
  return (
    <div className={bem(className, "", "PaddingHalf")}>
      <div className={bem("main", "MarginBottomQuart")}>
        <div className={bem("main-left")}>
          <div className={bem("main-trackNumber")}>
            <AddInput
              type="number"
              val={song.trackNumber}
              handleChange={onChange("trackNumber")}
              className={bem("main-trackNumber-input")}
            />
            <p
              children="."
              className={bem("main-trackNumber-dot")}
            />
          </div>
          <AddInput
            val={song.title}
            className={bem("main-text")}
            handleChange={onChange("title")}
          />
          <AddInput
            val={song.mix}
            placeholder="Mix"
            className={bem("main-mix")}
            handleChange={onChange("mix")}
            inputClassName={bem("main-mix-input")}
            style={{ display: !isEmpty(song.mix) ? "block" : null }}
          />
        </div>
        <p className={bem("main-duration")}>
          {deserializeDuration(song.duration)}
        </p>
      </div>
      <div className={bem("lists")}>
        <AddList
          addText="artist"
          val={song.artists}
          addClassName={bem("lists-add")}
          handleChange={onChange("artists")}
        />
        {isEmpty(song.featuring) ? null : (
          <p className={bem("lists-feat")}>feat.</p>
        )}
        <AddList
          addText="feat"
          val={song.featuring}
          addClassName={bem("lists-add")}
          className={bem("lists-feat-list")}
          handleChange={onChange("featuring")}
        />
        {isEmpty(song.remixers) ? null : (
          <p className={bem("lists-feat")}>&#40;</p>
        )}
        <AddList
          addText="remix"
          val={song.remixers}
          addClassName={bem("lists-add")}
          className={bem("lists-feat-list")}
          handleChange={onChange("remixers")}
        />
        {isEmpty(song.remixers) ? null : (
          <p className={bem("lists-feat")}>Remix)</p>
        )}
      </div>
    </div>
  )
}

AddSong.propTypes = {
  className: string,
  handleChange: func.isRequired,
  song: shape({
    title: string.isRequired,
    duration: number.isRequired,
    trackNumber: number.isRequired,
  }).isRequired,
}

AddSong.defaultProps = {
  className: null,
}

export default AddSong
