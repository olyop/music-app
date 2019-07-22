import React from "react"

import { string, func } from "prop-types"

const Icon = ({ icon, bem, className }) => (
  <i
    className={bem(className, { ignore: true, className: "material-icons" })}
    children={icon}
  />
)

Icon.propTypes = {
  icon: string.isRequired,
  bem: func.isRequired,
  className: string.isRequired
}

export default Icon
