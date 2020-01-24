import React from "react"

import reactBem from "@oly_op/react-bem"

import "./Spinner.scss"

const bem = reactBem("Spinner")

const Spinner = () => (
  <div className={bem("")}>
    <div className={bem("spin")}/>
    <div className={bem("spin")}/>
    <div className={bem("spin")}/>
  </div>
)

export default Spinner
