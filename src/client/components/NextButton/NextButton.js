import React from "react"

import Icon from "../Icon"

import { concat } from "lodash"
import { USER_ID } from "../../globals"
import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"
import { useApolloClient, useMutation } from "react-apollo"

import USER_NEXT_FRAG from "../../graphql/fragments/userNextFrag.graphql"
import USER_ADD_SONG_NEXT from "../../graphql/mutations/userAddSongNext.graphql"
import GET_USER_NEXT_CLIENT from "../../graphql/queries/getUserNextClient.graphql"

const bem = reactBem("NextButton")

const NextButton = ({ doc, className }) => {

  const client = useApolloClient()

  const user = client.readQuery({
    variables: { id: USER_ID },
    query: GET_USER_NEXT_CLIENT,
  })

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

  const update = (_, result) => {
    client.writeFragment({
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
