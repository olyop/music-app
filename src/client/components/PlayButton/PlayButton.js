import React, { useContext } from "react"

import Icon from "../Icon"
import UserContext from "../../contexts/User"
import PlayContext from "../../contexts/Play"

import reactBem from "@oly_op/react-bem"
import { isUndefined, isNull } from "lodash"
import { propTypes, defaultProps } from "./props"
import { useMutation, useApolloClient } from "@apollo/react-hooks"

import USER_PLAY from "../../graphql/mutations/userPlay.graphql"
import USER_QUEUES_FRAG from "../../graphql/fragments/userQueuesFrag.graphql"
import USER_CURRENT_FRAG from "../../graphql/fragments/userCurrentFrag.graphql"

import "./PlayButton.scss"

const bem = reactBem("PlayButton")

const PlayButton = ({ song, className }) => {

  const client = useApolloClient()
  const id = useContext(UserContext)
  const { play, setPlay } = useContext(PlayContext)

  const user = client.readFragment({ id, fragment: USER_CURRENT_FRAG })

  const { id: songId } = song
  const { id: userId, current } = user
  const variables = { userId, songId }

  const isPlay = isUndefined(current) || isNull(current) ? false : (current.id === songId)
  const isPlaying = isPlay && play

  const optimisticResponse = {
    userPlay: {
      prev: [],
      next: [],
      queue: [],
      id: userId,
      __typename: "User",
      current: { ...song, cover: "" },
    },
  }

  const update = (proxy, result) => {
    proxy.writeFragment({
      id: userId,
      data: result.data.userPlay,
      fragment: USER_QUEUES_FRAG,
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
