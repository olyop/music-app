import React from "react"

import Icon from "../Icon"
import Current from "../Current"
import Progress from "../Progress"
import { Link } from "react-router-dom"
import UserControls from "../UserControls"

import reactBem from "@oly_op/react-bem"

import "./index.scss"

const bem = reactBem("PlayerBar")

const PlayerBar = () => (
  <section className={bem("")}>
    <UserControls className={bem("controls")} />
    <div className={bem("main")}>
      <div className={bem("main-info")}>
        <Current/>
        <div className={bem("main-info-right")}>
          <Link to="/player" className={bem("link")}>
            <Icon
              icon="fullscreen"
              className={bem("main-info-right-icon", "icon")}
            />
          </Link>
          <Link to="/queues" className={bem("link")}>
            <Icon
              icon="queue_music"
              className={bem("main-info-right-icon", "icon")}
            />
          </Link>
          <Icon
            icon="volume_up"
            className={bem("main-info-right-volume", "icon")}
          />
        </div>
      </div>
      <Progress />
    </div>
  </section>
)

export default PlayerBar
