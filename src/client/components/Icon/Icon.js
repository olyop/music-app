import React from "react"

import { defaultProps, propTypes } from "./props"

import "./Icon.scss"

const Icon = ({ icon, bem, className, onClick }) => (
  <i
    className={bem(
      className,
      { ignore: true, className: "material-icons" },
      { ignore: true, className: "Icon" }
    )}
    onClick={onClick}
    children={icon}
    role="button"
    tabIndex={0}
  />
)

Icon.defaultProps = defaultProps
Icon.propTypes = propTypes

export default Icon
