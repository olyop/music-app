import React from "react"

import Icon from "../Icon"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./Empty.scss"

const bem = reactBem("Empty")

const Empty = ({ title }) => (
  <div className={bem("")}>
    <Icon className={bem("icon")} icon="help" />
    <h2 className={bem("title")}>{title}</h2>
  </div>
)

Empty.propTypes = propTypes

export default Empty
