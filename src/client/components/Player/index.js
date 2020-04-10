import React, { useContext } from "react"

import Img from "../Img"
import Icon from "../Icon"
import DocLink from "../DocLink"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import SongTitle from "../SongTitle"
import UserContext from "../../contexts/User"
import FeaturingArtists from "../FeaturingArtists"

import { propTypes } from "./props"
import { isUndefined, isNull } from "lodash"
import reactBem from "@oly_op/react-bem"
import { useQuery } from "@apollo/react-hooks"

import GET_USER_CURRENT from "../../graphql/queries/getUserCurrent.graphql"

import "./index.scss"

const bem = reactBem("Player")

const Player = ({ history }) => {
  const userId = useContext(UserContext)

  const { loading, error, data } = useQuery(
    GET_USER_CURRENT,
    { variables: { userId } },
  )

  if (loading) {
    return <Spinner/>
  }

  if (!isUndefined(error)) {
    return <ApiError error={error} />
  }

  if (isNull(data.user.current)) {
    return null
  }

  const { current } = data.user
  const { album, artists, featuring } = current

  return (
    <div className={bem("")}>
      <Icon
        icon="close"
        onClick={history.goBack}
        className={bem("close")}
      />
      <div className={bem("main")}>
        <Img
          url={album.cover}
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

Player.propTypes = propTypes

export default Player
