import React, { useState } from "react"

import QueryApi from "../QueryApi"
import Slider from "@material-ui/core/Slider"

import { string } from "prop-types"
import reactBem from "@oly_op/react-bem"
import { isUndefined, isNull } from "lodash"
import { deserializeDuration } from "../../helpers"

import GET_USER_CURRENT from "../../graphql/queries/getUserCurrent.gql"

import "./index.scss"

const bem = reactBem("Progress")

const determineDuration = data => {
  if (isUndefined(data)) {
    return 0
  } else if (isNull(data.user.current)) {
    return 0
  } else {
    return data.user.current.duration
  }
}

const Progress = ({ className }) => {
  const [ current, setCurrent ] = useState(0)
  const handleChange = (_, value) => setCurrent(value)
  return (
    <QueryApi
      spinner={false}
      query={GET_USER_CURRENT}
      children={
        data => {
          const duration = determineDuration(data)
          return (
            <div className={bem(className, "")}>
              <p className="Text">{deserializeDuration(current)}</p>
              <div className={bem("slider")}>
                <Slider
                  min={0}
                  step={1}
                  max={duration}
                  value={current}
                  onChange={handleChange}
                />
              </div>
              <p className="Text">{deserializeDuration(duration)}</p>
            </div>
          )
        }
      }
    />
  )
}

Progress.propTypes = {
  className: string,
}

Progress.defaultProps = {
  className: null,
}

export default Progress
