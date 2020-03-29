import React, { useContext } from "react"

import Icon from "../Icon"
import UserCtx from "../../contexts/User"
import PlayCtx from "../../contexts/Play"

import { isNull } from "lodash"
import reactBem from "@oly_op/react-bem"
import { useMutation } from "@apollo/react-hooks"
import { propTypes, defaultProps } from "./props"

import USER_PLAY from "../../graphql/mutations/userPlay.graphql"
import USER_QUEUES_FRAG from "../../graphql/fragments/userQueuesFrag.graphql"

import "./PlayButton.scss"

const bem = reactBem("PlayButton")

const PlayButton = ({ song, className }) => {

  const user = useContext(UserCtx)
  const { play, setPlay } = useContext(PlayCtx)

  const { id: songId } = song
  const { id: userId, current } = user
  const variables = { userId, songId }

  const isPlay = isNull(current) ? false : (current.id === songId)
  const isPlaying = isPlay && play

  const optimisticResponse = {
    __typename: "Mutation",
    userPlay: {
      prev: [],
      next: [],
      queue: [],
      id: userId,
      current: song,
      __typename: "User",
    },
  }

  const update = (client, result) => {
    client.writeFragment({
      id: userId,
      fragment: USER_QUEUES_FRAG,
      data: { ...result.data.userPlay, __typename: "User" },
    })
  }

  const [ userPlay ] = useMutation(
    USER_PLAY,
    { variables, optimisticResponse, update },
  )

  const handleClick = () => {
    if (isPlay) setPlay(!play)
    else userPlay()
  }

  return (
    <Icon
      onClick={handleClick}
      icon={isPlaying ? "pause" : "play_arrow"}
      className={bem({ ignore: true, className }, "")}
    />
  )
}

PlayButton.propTypes = propTypes
PlayButton.defaultProps = defaultProps

export default PlayButton
