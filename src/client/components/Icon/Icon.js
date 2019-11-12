import React from "react"

import { string, func } from "prop-types"
import reactBem from "@oly_op/react-bem"
import { noop } from "lodash"

import "./Icon.scss"

const bem = reactBem("Icon")

const Icon = ({ icon, className, onClick }) => (
  <i
    className={bem(
      { ignore: true, className },
      "",
      { ignore: true, className: "material-icons" }
    )}
    onClick={onClick}
    children={icon}
    role="button"
    tabIndex={0}
  />
)

Icon.propTypes = {
  onClick: func,
  className: string,
  icon: string.isRequired,
}

Icon.defaultProps = {
  onClick: noop,
  className: undefined
}

export default Icon
