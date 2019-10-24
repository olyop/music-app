import React from "react"

import reactBEM from "@oly_op/react-bem"

import "./Loading.scss"

const bem = reactBEM("Loading")

const Loading = () => (
  <div className={bem("")}>
    Loading....
  </div>
)

export default Loading
