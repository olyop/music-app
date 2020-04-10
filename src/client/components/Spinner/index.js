import React from "react"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"

import "./index.scss"

const bem = reactBem("Spinner")

const Spinner = ({ className }) => (
  <div className={bem({ ignore: true, className }, "")}>
    <div className={bem("spin")}/>
    <div className={bem("spin")}/>
    <div className={bem("spin")}/>
  </div>
)

Spinner.propTypes = propTypes
Spinner.defaultProps = defaultProps

export default Spinner
