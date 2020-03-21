import React, { useContext } from "react"

import Icon from "../Icon"
import UserCtx from "../../ctx/User"

import reactBem from "@oly_op/react-bem"
import { useMutation } from "@apollo/react-hooks"
import { propTypes, defaultProps } from "./props"

import USER_PLAY from "../../graphql/mutations/userPlay.graphql"
import USER_PLAY_FRAG from "../../graphql/fragments/userPlayFrag.graphql"

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
    client.writeFragment({
      id: userId,
      fragment: USER_PLAY_FRAG,
      data: { ...result.data.userPlay, __typename: "User" },
    })
  }

  const [ userPlay ] = useMutation(
    USER_PLAY,
    { variables, optimisticResponse, update },
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
