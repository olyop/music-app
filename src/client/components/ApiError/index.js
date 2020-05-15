import React from "react"

import { instanceOf } from "prop-types"

import "./index.scss"

const ApiError = ({ error }) => (
  <pre className="ApiError">
    {JSON.stringify(error, undefined, 2)}
  </pre>
)

ApiError.propTypes = {
  error: instanceOf(Error).isRequired,
}

export default ApiError
