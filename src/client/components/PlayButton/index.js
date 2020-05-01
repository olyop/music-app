import React, { useContext } from "react"

import Icon from "../Icon"
import UserContext from "../../contexts/User"
import PlayContext from "../../contexts/Play"

import reactBem from "@oly_op/react-bem"
import { useMutation } from "@apollo/react-hooks"
import { propTypes, defaultProps } from "./props"

import USER_PLAY from "../../graphql/mutations/userPlay.gql"

import "./index.scss"

const bem = reactBem("PlayButton")

const PlayButton = ({ song, className }) => {
  const userId = useContext(UserContext)

  const { id: songId, isCurrent } = song

  const [ userPlay ] = useMutation(USER_PLAY, {
    variables: { userId, songId },
  })

  const { play, setPlay } = useContext(PlayContext)

  const handleClick = () => (isCurrent ? setPlay(!play) : userPlay())

  return (
    <Icon
      onClick={handleClick}
      className={bem({ ignore: true, className }, "")}
      icon={isCurrent && play ? "pause" : "play_arrow"}
    />
  )
}

PlayButton.propTypes = propTypes
PlayButton.defaultProps = defaultProps

export default PlayButton
