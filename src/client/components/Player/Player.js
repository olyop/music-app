import React from "react"

import Img from "../Img"
import Icon from "../Icon"
import Spinner from "../Spinner"
import DocLink from "../DocLink"
import ApiError from "../ApiError"
import SongTitle from "../SongTitle"
import FeaturingArtists from "../FeaturingArtists"

import { propTypes } from "./props"
import { USER_ID } from "../../globals"
import reactBem from "@oly_op/react-bem"
import { isNull, isUndefined } from "lodash"
import { useQuery } from "@apollo/react-hooks"

import GET_USER_QUEUES from "../../graphql/queries/getUserQueues.graphql"

import "./Player.scss"

const bem = reactBem("Player")

const Player = ({ history }) => {
  const variables = { id: USER_ID }
  const { data, loading, error } = useQuery(GET_USER_QUEUES, { variables })
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError error={error} />
  } else if (isNull(data.user.current)) {
    return <div className={bem("")} />
  } else {
    const { artists, featuring, album } = data.user.current
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
}

Player.propTypes = propTypes

export default Player
