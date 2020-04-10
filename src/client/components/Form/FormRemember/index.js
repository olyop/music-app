import React from "react"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./index.scss"

const bem = reactBem("FormRemember")

const FormRemember = ({ text, remember, onToggleRemember }) => (
  <label className={bem("")}>
    <input
      name="remember"
      type="checkbox"
      checked={remember}
      className={bem("check")}
      onChange={onToggleRemember}
    />
    <span
      children={text}
      className={bem("text")}
    />
  </label>
)

FormRemember.propTypes = propTypes

export default FormRemember
