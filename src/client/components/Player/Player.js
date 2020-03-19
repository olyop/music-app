import React from "react"

import reactBem from "@oly_op/react-bem"

import "./Player.scss"

const bem = reactBem("Player")

const Player = () => (
  <div className={bem("")}>
    Player
  </div>
)

export default Player
