import React from "react"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./index.scss"

const bem = reactBem("ApiError")

const ApiError = ({ error }) => (
  <pre className={bem("")}>{JSON.stringify(error, undefined, 2)}</pre>
)

ApiError.propTypes = propTypes

export default ApiError
