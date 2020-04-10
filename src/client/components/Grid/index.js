import React from "react"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"

import "./index.scss"

const bem = reactBem("Grid")

const Grid = ({ children, className }) => (
  <div className={bem({ ignore: true, className }, "")}>
    {children}
  </div>
)

Grid.propTypes = propTypes
Grid.defaultProps = defaultProps

export default Grid
