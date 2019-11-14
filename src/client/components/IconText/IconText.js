import React from "react"

import Icon from "../Icon"

import { string } from "prop-types"
import reactBem from "@oly_op/react-bem"

import "./IconText.scss"

const bem = reactBem("IconText")

const IconText = ({ icon, text, className, iconClassName }) => (
  <div className={bem({ ignore: true, className }, "")}>
    <Icon
      icon={icon}
      className={iconClassName}
    />
    <p className={bem("text")}>{text}</p>
  </div>
)

IconText.propTypes = {
  icon: string.isRequired,
  text: string.isRequired,
  className: string,
  iconClassName: string
}

IconText.defaultProps = {
  className: undefined,
  iconClassName: undefined
}

export default IconText
