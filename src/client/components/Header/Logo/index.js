import React from "react"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"

import "./index.scss"

const bem = reactBem("Logo")

const Logo = ({ className }) => (
  <div className={bem({ ignore: true, className }, "")}>
    music-app
  </div>
)

Logo.propTypes = propTypes
Logo.defaultProps = defaultProps

export default Logo
