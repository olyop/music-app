import React from "react"

import Icon from "../Icon"
import Current from "../Current"
import Progress from "../Progress"
import { NavLink } from "react-router-dom"
import UserControls from "../UserControls"

import reactBem from "@oly_op/react-bem"

import "./index.scss"

const bem = reactBem("PlayerBar")

const PlayerBar = () => (
  <div className={bem("", "Elevated")}>
    <UserControls
      className={bem("controls")}
      iconClassName={bem("icon")}
    />
    <div className={bem("main")}>
      <div className={bem("main-info")}>
        <div className={bem("main-info-controls")}>
          <NavLink className={bem("main-info-controls-control")} to="/player">
            <Icon
              icon="fullscreen"
              className={bem("icon", "IconHover")}
            />
          </NavLink>
          <NavLink className={bem("main-info-controls-control")} to="/queues">
            <Icon
              icon="queue_music"
              className={bem("icon", "IconHover")}
            />
          </NavLink>
          <Icon
            icon="volume_up"
            className={bem("main-info-controls-control", "icon", "IconHover")}
          />
        </div>
        <Current/>
      </div>
      <Progress/>
    </div>
  </div>
)

export default PlayerBar
