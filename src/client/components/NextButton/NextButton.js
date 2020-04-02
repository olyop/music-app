import React, { useContext } from "react"

import Icon from "../Icon"
import UserContext from "../../contexts/User"

import { concat } from "lodash"
import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"
import { useApolloClient, useMutation } from "react-apollo"

import USER_NEXT_FRAG from "../../graphql/fragments/userNextFrag.graphql"
import USER_ADD_SONG_NEXT from "../../graphql/mutations/userAddSongNext.graphql"

const bem = reactBem("NextButton")

const NextButton = ({ doc, className }) => {

  const client = useApolloClient()
  const id = useContext(UserContext)
  const user = client.readFragment({ id, fragment: USER_NEXT_FRAG })

  const { id: songId } = doc
  const { id: userId, next } = user
  const variables = { userId, songId }

  const optimisticResponse = {
    userAddSongNext: {
      id: userId,
      __typename: "User",
      next: concat(doc, next),
    },
  }

  const update = (proxy, result) => {
    proxy.writeFragment({
      id: userId,
      fragment: USER_NEXT_FRAG,
      data: result.data.userAddSongNext,
    })
  }

  const [ mutation ] = useMutation(
    USER_ADD_SONG_NEXT,
    { variables, optimisticResponse, update },
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
