import React, { useContext } from "react"

import Icon from "../Icon"
import UserCtx from "../../ctx/User"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"
import { useMutation, useApolloClient } from "@apollo/react-hooks"

import UPDATE_NOW_PLAYING from "../../graphql/mutations/updateNowPlaying.graphql"
import USER_NOW_PLAYING_FRAG from "../../graphql/fragments/userNowPlayingFrag.graphql"

import "./PlayButton.scss"

const bem = reactBem("PlayButton")

const PlayButton = ({ song, className }) => {
  
  const user = useContext(UserCtx)
  const client = useApolloClient()
  const [ mutateNowPlaying ] = useMutation(UPDATE_NOW_PLAYING)

  const { id: userId } = user
  const { id: songId } = song
  const variables = { userId, songId }

  const handleClick = () => {
    mutateNowPlaying({
      variables,
      optimisticResponse: {
        __typename: "Mutation",
        updateNowPlaying: {
          ...user,
          nowPlaying: song,
          __typeName: "User",
        },
      },
      update: () => {
        const fragment = USER_NOW_PLAYING_FRAG
        const userFrag = { nowPlaying: song, __typename: "User" }
        client.writeFragment({ id: userId, fragment, data: userFrag })
      },
    })
  }

  return (
    <Icon
      icon="play_arrow"
      onClick={handleClick}
      className={bem({ ignore: true, className }, "")}
    />
  )
}

PlayButton.propTypes = propTypes
PlayButton.defaultProps = defaultProps

export default PlayButton
