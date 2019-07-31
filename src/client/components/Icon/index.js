import React from "react"

import { func, string } from "prop-types"
import { noop } from "lodash"

import "./index.scss"

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

Icon.propTypes = {
  icon: string.isRequired,
  bem: func.isRequired,
  className: string.isRequired,
  onClick: func
}

Icon.defaultProps = {
  onClick: noop
}

export default Icon
