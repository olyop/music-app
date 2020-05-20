import React from "react"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"

import "./index.scss"

const bem = reactBem("Spinner")

const Spinner = ({ className, spinClassName }) => (
  <div className={bem(className, "")}>
    <div className={bem(spinClassName, "spin")}/>
    <div className={bem(spinClassName, "spin")}/>
    <div className={bem(spinClassName, "spin")}/>
  </div>
)

Spinner.propTypes = propTypes
Spinner.defaultProps = defaultProps

export default Spinner
