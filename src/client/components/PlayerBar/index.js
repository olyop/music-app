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
        <QueryApi
          query={GET_USER_CURRENT}
          children={
            ({ user }) => (
              isNull(user.current) ? null : (
                <ItemSong
                  showPlay={false}
                  showRight={false}
                  song={user.current}
                />
              )
            )
          }
        />
      </div>
      <Progress/>
    </div>
  </div>
)

export default PlayerBar
