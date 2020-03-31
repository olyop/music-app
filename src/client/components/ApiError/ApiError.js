import React from "react"

import { propTypes } from "./props"

const ApiError = ({ error }) => (
  <div>
    <pre>{JSON.stringify(error, undefined, 2)}</pre>
  </div>
)

ApiError.propTypes = propTypes

export default ApiError
