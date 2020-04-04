import React, { useContext } from "react"

import Song from "../Song"
import UserContext from "../../contexts/User"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"
import { useApolloClient } from "@apollo/react-hooks"
import USER_CURRENT_FRAG from "../../graphql/fragments/userCurrentFrag.graphql"

import "./Current.scss"

const bem = reactBem("Current")

const Current = ({ className }) => {
  const client = useApolloClient()
  const id = useContext(UserContext)
  const user = client.readFragment({ id, fragment: USER_CURRENT_FRAG })
  return (
    <Song
      showAdd
      song={user.current}
      className={bem({ ignore: true, className }, "")}
    />
  )
}

Current.propTypes = propTypes
Current.defaultProps = defaultProps

export default Current
