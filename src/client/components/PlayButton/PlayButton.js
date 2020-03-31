import React, { useContext } from "react"

import Icon from "../Icon"
import PlayCtx from "../../contexts/Play"

import { USER_ID } from "../../globals"
import reactBem from "@oly_op/react-bem"
import { isUndefined, isNull } from "lodash"
import { propTypes, defaultProps } from "./props"
import { useMutation, useApolloClient } from "@apollo/react-hooks"

import USER_PLAY from "../../graphql/mutations/userPlay.graphql"
import USER_QUEUES_FRAG from "../../graphql/fragments/userQueuesFrag.graphql"
import GET_USER_CURRENT_CLIENT from "../../graphql/queries/getUserCurrentClient.graphql"

import "./PlayButton.scss"

const bem = reactBem("PlayButton")

const PlayButton = ({ song, className }) => {

  const client = useApolloClient()
  const { play, setPlay } = useContext(PlayCtx)

  const user = client.readQuery({
    variables: { id: USER_ID },
    query: GET_USER_CURRENT_CLIENT,
  })

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
      current: song,
      __typename: "User",
    },
  }

  const update = (_, result) => {
    client.writeFragment({
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
