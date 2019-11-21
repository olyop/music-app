import React from "react"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"

import "./Icon.scss"

const bem = reactBem("Icon")

const Icon = ({ icon, className, onClick }) => (
  <i
    tabIndex={0}
    role="button"
    children={icon}
    onClick={onClick}
    className={bem(
      { ignore: true, className },
      "",
      { ignore: true, className: "material-icons" }
    )}
  />
)

Icon.propTypes = propTypes
Icon.defaultProps = defaultProps

export default Icon
