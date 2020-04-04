import React, { useContext } from "react"

import Icon from "../Icon"
import UserContext from "../../contexts/User"
import PlayContext from "../../contexts/Play"

import { isNull } from "lodash"
import reactBem from "@oly_op/react-bem"
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

  const { current } = user
  const { id: songId } = song
  const variables = { userId: id, songId }

  const isPlay = isNull(current) ? false : (current.id === songId)
  const isPlaying = isPlay && play

  const optimisticResponse = {
    userPlay: {
      id,
      prev: [],
      next: [],
      queue: [],
      current: song,
      __typename: "User",
    },
  }

  const update = (proxy, result) => {
    proxy.writeFragment({
      id,
      fragment: USER_QUEUES_FRAG,
      data: { ...result.data.userPlay },
    })
  }

  const [ userPlay ] = useMutation(
    USER_PLAY,
    { variables, update, optimisticResponse },
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
