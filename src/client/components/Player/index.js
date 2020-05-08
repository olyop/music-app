import React, { Fragment } from "react"

import Img from "../Img"
import Icon from "../Icon"
import Empty from "../Empty"
import DocLink from "../DocLink"
import QueryApi from "../QueryApi"
import Progress from "../Progress"
import SongTitle from "../SongTitle"
import FeaturingArtists from "../FeaturingArtists"

import { isNull } from "lodash"
import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import GET_USER_CURRENT from "../../graphql/queries/getUserCurrent.gql"

import "./index.scss"

const bem = reactBem("Player")

const Player = ({ history }) => (
  <div className={bem("", "Elevated")}>
    <QueryApi
      query={GET_USER_CURRENT}
      spinnerClassName={bem("spinner")}
      children={
        ({ user }) => {
          const { current } = user

          if (isNull(current)) {
            return <Empty title="No Current Song" />
          }

          const { artists, featuring, album } = current

          return (
            <Fragment>
              <Icon
                icon="close"
                onClick={history.goBack}
                className={bem("close")}
              />
              <div className={bem("main")}>
                <Img
                  url={album.cover}
                  title={album.title}
                  className={bem("main-cover", "Card", "Elevated")}
                />
                <h1 className={bem("main-title")}>
                  <SongTitle
                    showRemixers
                    song={current}
                  />
                </h1>
                <h1 className={bem("main-info")}>
                  <DocLink doc={album} />
                  <Fragment> - </Fragment>
                  <FeaturingArtists
                    artists={artists}
                    featuring={featuring}
                  />
                </h1>
                <Progress/>
              </div>
            </Fragment>
          )
        }
      }
    />
  </div>
)

Player.propTypes = propTypes

export default Player
