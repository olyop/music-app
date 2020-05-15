import React from "react"

import reactBem from "@oly_op/react-bem"
import { string, func } from "prop-types"

import "./index.scss"

const bem = reactBem("Button")

const Button = ({ text, onClick, className }) => (
  <button
    title={text}
    type="button"
    children={text}
    onClick={onClick}
    className={bem(className, "", "Hover")}
  />
)

Button.propTypes = {
  onClick: func,
  className: string,
  text: string.isRequired,
}

Button.defaultProps = {
  onClick: null,
  className: null,
}

export default Button
