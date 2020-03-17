import React, { useContext } from "react"

import Icon from "../Icon"
import UserCtx from "../../ctx/User"

import reactBem from "@oly_op/react-bem"
import { useMutation } from "@apollo/react-hooks"
import { propTypes, defaultProps } from "./props"

import USER_PLAY from "../../graphql/mutations/userPlay.graphql"
import USER_NOW_PLAYING_FRAG from "../../graphql/fragments/userNowPlayingFrag.graphql"

import "./PlayButton.scss"

const bem = reactBem("PlayButton")

const PlayButton = ({ song, className }) => {
  
  const user = useContext(UserCtx)
  const [ userPlay ] = useMutation(USER_PLAY)

  const { id: userId } = user
  const { id: songId } = song
  const variables = { userId, songId }

  const handleClick = () => {
    userPlay({
      variables,
      optimisticResponse: {
        __typename: "Mutation",
        userPlay: {
          ...user,
          prev: [],
          next: [],
          later: [],
          nowPlaying: song,
          __typename: "User",
        },
      },
      update: (client, { data }) => {
        const fragment = USER_NOW_PLAYING_FRAG
        const { userPlay: { nowPlaying } } = data
        const userFrag = { nowPlaying, __typename: "User" }
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
