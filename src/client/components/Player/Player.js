import React, { useContext } from "react"

import Img from "../Img"
import Icon from "../Icon"
import DocLink from "../DocLink"
import SongTitle from "../SongTitle"
import UserContext from "../../contexts/User"
import FeaturingArtists from "../FeaturingArtists"

import { isNull } from "lodash"
import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"
import { catalogUrl } from "../../helpers"

import "./Player.scss"

const bem = reactBem("Player")

const Player = ({ history }) => {
  const { current } = useContext(UserContext)
  if (isNull(current)) {
    return <div className={bem("")} />
  } else {
    const { artists, featuring, album } = current
    return (
      <div className={bem("")}>
        <Icon
          icon="close"
          onClick={history.goBack}
          className={bem("close")}
        />
        <div className={bem("main")}>
          <Img
            url={catalogUrl(album)}
            className={bem("main-cover")}
          />
          <h1 className={bem("main-title")}>
            <SongTitle
              showRemixers
              song={current}
            />
          </h1>
          <h1 className={bem("main-album")}>
            <DocLink
              doc={album}
              path="/album"
            />
          </h1>
          <h2 className={bem("main-artists")}>
            <FeaturingArtists
              artists={artists}
              featuring={featuring}
            />
          </h2>
        </div>
      </div>
    )
  }
}

Player.propTypes = propTypes

export default Player
