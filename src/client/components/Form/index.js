import React from "react"

import "./index.scss"

const Form = ({ config }) => {
  return (
    <pre>{JSON.stringify(config, undefined, 2)}</pre>
  )
}

export default Form
