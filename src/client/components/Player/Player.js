import React, { useContext } from "react"

import Img from "../Img"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import SongTitle from "../SongTitle"
import UserCtx from "../../ctx/User"
import FeaturingArtists from "../FeaturingArtists"

import { isUndefined } from "lodash"
import reactBem from "@oly_op/react-bem"
import { useQuery } from "@apollo/react-hooks"
import { catalogUrl } from "../../helpers/misc"
import GET_NOW_PLAYING from "../../graphql/queries/getNowPlaying.graphql"

import "./Player.scss"

const bem = reactBem("Player")

const Player = () => {
  const { id } = useContext(UserCtx)
  const queryOptions = { variables: { id } }
  const { loading, error, data } = useQuery(GET_NOW_PLAYING, queryOptions)
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const { nowPlaying } = data.user
    const { artists, featuring, album } = nowPlaying
    return (
      <div className={bem("")}>
        <div className={bem("main")}>
          <Img
            className={bem("main-cover")}
            url={catalogUrl(album.id)}
          />
          <h1 className={bem("main-title")}>
            <SongTitle
              song={nowPlaying}
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

export default Player
