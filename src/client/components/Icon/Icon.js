import React from "react"

import { func, string } from "prop-types"

import "./Icon.scss"

const Icon = ({ icon, bem, className, onClick }) => (
  <i
    className={bem(
      className,
      { ignore: true, className: "Icon" },
      { ignore: true, className: "material-icons" }
    )}
    onClick={onClick}
    children={icon}
    role="button"
    tabIndex={0}
  />
)

Icon.propTypes = {
  icon: string.isRequired,
  bem: func.isRequired,
  className: string.isRequired,
  onClick: func.isRequired
}

export default Icon