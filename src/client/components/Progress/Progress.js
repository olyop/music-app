import React from "react"

import Slider from "@material-ui/core/Slider"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"
import { deserializeDuration } from "../../helpers"

import "./Progress.scss"

const bem = reactBem("Progress")

const Progress = ({ duration, current, setCurrent }) => {
  const handleChange = (_, value) => setCurrent(value)
  return (
    <div className={bem("")}>
      <p
        className={bem("start")}
        children={deserializeDuration(current)}
      />
      <div className={bem("slider")}>
        <Slider
          min={0}
          step={1}
          max={duration}
          value={current}
          onChange={handleChange}
        />
      </div>
      <p
        className={bem("end")}
        children={deserializeDuration(duration)}
      />
    </div>
  )
}

Progress.propTypes = propTypes

export default Progress
