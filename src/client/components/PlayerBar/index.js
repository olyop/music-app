import React from "react"

import Icon from "../Icon"
import QueryApi from "../QueryApi"
import Progress from "../Progress"
import { ItemSong } from "../Item"
import { NavLink } from "react-router-dom"
import UserControls from "../UserControls"

import { isNull } from "lodash"
import reactBem from "@oly_op/react-bem"

import GET_USER_CURRENT from "../../graphql/queries/getUserCurrent.gql"

import "./index.scss"

const bem = reactBem("PlayerBar")

const PlayerBar = () => (
  <footer className={bem("", "Elevated")}>
    <UserControls
      className={bem("controls")}
      iconClassName={bem("icon")}
    />
    <div className={bem("main")}>
      <QueryApi
        query={GET_USER_CURRENT}
        children={
          ({ user }) => (
            <div className={bem("main-info")}>
              <div className={bem("main-info-controls")}>
                <NavLink className={bem("main-info-controls-control")} to="/player">
                  <Icon
                    icon="fullscreen"
                    title="Fullscreen"
                    className={bem("icon", "IconHover")}
                  />
                </NavLink>
                <NavLink className={bem("main-info-controls-control")} to="/queues">
                  <Icon
                    title="Queue"
                    icon="queue_music"
                    className={bem("icon", "IconHover")}
                  />
                </NavLink>
                <Icon
                  title="Volume"
                  icon="volume_up"
                  className={bem(
                    "main-info-controls-control-volume",
                    "main-info-controls-control",
                    "icon",
                    "IconHover",
                  )}
                />
              </div>
              {isNull(user.current) ? null : (
                <ItemSong
                  showPlay={false}
                  showRight={false}
                  song={user.current}
                  addClassName={bem("icon")}
                  className={bem("main-info-current")}
                />
              )}
            </div>
          )
        }
      />
      <Progress/>
    </div>
  </footer>
)

export default PlayerBar
