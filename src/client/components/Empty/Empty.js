import React from "react"

import reactBem from "@oly_op/react-bem"

const bem = reactBem("Empty")

const Empty = () => (
  <div className={bem("")}>
    Empty...
  </div>
)

export default Empty
