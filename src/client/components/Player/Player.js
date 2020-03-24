import React, { useContext } from "react"

import Img from "../Img"
import Icon from "../Icon"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import SongTitle from "../SongTitle"
import UserCtx from "../../ctx/User"
import FeaturingArtists from "../FeaturingArtists"

import { propTypes } from "./props"
import { isUndefined } from "lodash"
import reactBem from "@oly_op/react-bem"
import { useQuery } from "@apollo/react-hooks"
import { catalogUrl } from "../../helpers/misc"
import GET_USER_CURRENT from "../../graphql/queries/getUserCurrent.graphql"

import "./Player.scss"

const bem = reactBem("Player")

const Player = ({ history }) => {
  const { id } = useContext(UserCtx)
  const queryOptions = { variables: { id } }
  const { loading, error, data } = useQuery(GET_USER_CURRENT, queryOptions)
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const { current } = data.user
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
              song={current}
              showRemixers={true}
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
