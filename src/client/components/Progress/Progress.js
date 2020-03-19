import React, { useState } from "react"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"
import determineDuration from "../../helpers/deserializeDuration"

import "./Progress.scss"

const bem = reactBem("Progress")

const Progress = ({ position, duration }) => {

  const [ left, setLeft ] = useState(position)
  
  const handleDrag = ({ nativeEvent }) => {
    const { offsetX } = nativeEvent
    setLeft(position - offsetX)
  }

  return (
    <div className={bem("")}>
      <p
        children="0:00"
        className={bem("start")}
      />
      <div className={bem("bar")}>

        <div className={bem("bar-track")} />

        <div className={bem("bar-progress")} />

        <div
          style={{ left }}
          onDrag={handleDrag}
          className={bem("bar-thumb")}
        />

      </div>
      <p
        className={bem("end")}
        children={determineDuration(duration)}
      />
    </div>
  )
}

Progress.propTypes = propTypes

export default Progress
