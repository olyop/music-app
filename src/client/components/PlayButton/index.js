import React, { useContext } from "react"

import Icon from "../Icon"
import UserContext from "../../contexts/User"
import PlayContext from "../../contexts/Play"

import { useMutation } from "@apollo/react-hooks"
import { propTypes, defaultProps } from "./props"

import USER_PLAY from "../../graphql/mutations/userPlay.gql"

const PlayButton = ({ doc, className }) => {
  const userId = useContext(UserContext)

  const { songId, isCurrent } = doc

  const [ userPlay, { error } ] = useMutation(USER_PLAY, {
    variables: { userId, songId },
  })

  const { play, setPlay } = useContext(PlayContext)

  const handleClick = () => (isCurrent ? setPlay(!play) : userPlay())

  if (error) {
    console.error(error)
  }

  const icon = error ? "error" :
    (isCurrent && play ? "pause" : "play_arrow")

  return (
    <Icon
      icon={icon}
      title="Play"
      onClick={handleClick}
      className={[className, "IconHover"].join(" ")}
    />
  )
}

PlayButton.propTypes = propTypes
PlayButton.defaultProps = defaultProps

export default PlayButton
