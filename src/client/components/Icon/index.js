import React from "react"

import { noop } from "lodash"
import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"

import "./index.scss"

const bem = reactBem("Icon")

const Icon = ({ icon, title, disabled, className, onClick }) => (
  <i
    tabIndex={0}
    role="button"
    title={title}
    children={icon}
    onClick={disabled ? noop : onClick}
    className={bem(
      { ignore: true, className },
      "",
      { ignore: true, className: "material-icons" },
    )}
  />
)

Icon.propTypes = propTypes
Icon.defaultProps = defaultProps

export default Icon
