import React, { useState } from "react"

import Slider from "@material-ui/core/Slider"

import reactBem from "@oly_op/react-bem"
import { deserializeDuration } from "../../helpers"

import "./index.scss"

const bem = reactBem("Progress")

const Progress = () => {
  const duration = 0
  const [ current, setCurrent ] = useState(0)
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

export default Progress
