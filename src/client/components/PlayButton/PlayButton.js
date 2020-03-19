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

  const { id: userId } = user
  const { id: songId } = song
  const variables = { userId, songId }

  const optimisticResponse = {
    __typename: "Mutation",
    userPlay: {
      prev: [],
      next: [],
      later: [],
      id: userId,
      nowPlaying: song,
      __typename: "User",
    },
  }

  const update = (client, result) => {
    const { nowPlaying } = result.data.userPlay
    client.writeFragment({
      id: userId,
      fragment: USER_NOW_PLAYING_FRAG,
      data: {
        prev: [],
        next: [],
        later: [],
        nowPlaying,
        __typename: "User",
      },
    })
  }

  const [ userPlay ] = useMutation(
    USER_PLAY,
    { update, variables, optimisticResponse },
  )

  const handleClick = () => userPlay()

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
