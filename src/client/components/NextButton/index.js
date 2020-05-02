import React, { useContext } from "react"

import Icon from "../Icon"
import UserContext from "../../contexts/User"

import reactBem from "@oly_op/react-bem"
import { useMutation } from "react-apollo"
import { propTypes, defaultProps } from "./props"

import USER_ADD_SONG_NEXT from "../../graphql/mutations/userAddSongNext.gql"

const bem = reactBem("NextButton")

const NextButton = ({ doc, className }) => {

  const { songId } = doc
  const userId = useContext(UserContext)

  const [ mutation ] = useMutation(
    USER_ADD_SONG_NEXT,
    { variables: { userId, songId } },
  )

  const handleClick = () => mutation()

  return (
    <Icon
      icon="double_arrow"
      onClick={handleClick}
      title="Play Song Next"
      className={bem({ ignore: true, className }, "")}
    />
  )
}

NextButton.propTypes = propTypes
NextButton.defaultProps = defaultProps

export default NextButton
