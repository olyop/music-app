import React from "react"

import reactBEM from "@oly_op/react-bem"

const bem = reactBEM("Empty")

const Empty = () => (
  <div className={bem("")}>
    Empty...
  </div>
)

export default Empty
