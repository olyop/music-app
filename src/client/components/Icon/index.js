import React from "react"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"

import "./index.scss"

const bem = reactBem("Icon")

const Icon = ({ icon, style, title, className, onClick }) => (
  <i
    style={style}
    title={title}
    children={icon}
    onClick={onClick}
    className={bem(
      className,
      "ButtonHover",
      "",
      { ignore: true, className: "material-icons" },
    )}
  />
)

Icon.propTypes = propTypes
Icon.defaultProps = defaultProps

export default Icon
