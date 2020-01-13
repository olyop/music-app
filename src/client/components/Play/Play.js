import React, { useContext } from "react"

import Icon from "../Icon"
import UserCtx from "../../ctx/user"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"
import { useMutation, useApolloClient } from "@apollo/react-hooks"

import UPDATE_NOW_PLAYING from "../../graphql/mutations/updateNowPlaying.graphql"
import USER_NOW_PLAYING_FRAG from "../../graphql/fragments/userNowPlayingFrag.graphql"

import "./Play.scss"

const bem = reactBem("Play")

const Play = ({ song, className }) => {
  const client = useApolloClient()
  const { user } = useContext(UserCtx)
  const [ mutateNowPlaying ] = useMutation(UPDATE_NOW_PLAYING)

  const handleClick = () => {
    const { id: userId } = user
    const { id: songId } = song
    const variables = { userId, songId }
    mutateNowPlaying({ variables })
    const fragment = USER_NOW_PLAYING_FRAG
    const userFrag = { nowPlaying: song, __typename: "User" }
    client.writeFragment({ id: userId, fragment, data: userFrag })
  }

  return (
    <Icon
      icon="play_arrow"
      onClick={handleClick}
      className={bem({ ignore: true, className }, "")}
    />
  )
}

Play.propTypes = propTypes
Play.defaultProps = defaultProps

export default Play
