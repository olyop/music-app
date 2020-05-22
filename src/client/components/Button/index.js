import React, { Fragment } from "react"

import Icon from "../Icon"

import reactBem from "@oly_op/react-bem"
import { string, func } from "prop-types"

import "./index.scss"

const bem = reactBem("Button")

const Button = ({ text, icon, onClick, className }) => (
  <button
    title={text}
    type="button"
    onClick={onClick}
    className={bem(className, "", "Hover")}
    children={(
      <Fragment>
        {icon ? <Icon className={bem("icon")} icon={icon} /> : null}
        {text ? <span className={bem("text")}>{text}</span> : null}
      </Fragment>
    )}
  />
)

Button.propTypes = {
  icon: string,
  text: string,
  onClick: func,
  className: string,
}

Button.defaultProps = {
  icon: null,
  text: null,
  onClick: null,
  className: null,
}

export default Button
