import React, { useContext } from "react"

import UserContext from "../../contexts/User"

import reactBem from "@oly_op/react-bem"
import { useApolloClient } from "react-apollo"

import USER_NAME_FRAG from "../../graphql/fragments/userNameFrag.graphql"

import "./UserPage.scss"

const bem = reactBem("UserPage")

const UserPage = () => {

  const client = useApolloClient()
  const id = useContext(UserContext)
  const user = client.readFragment({ id, fragment: USER_NAME_FRAG })

  return (
    <div className={bem("")}>
      <h1 className={bem("name")}>{user.name}</h1>
    </div>
  )
}

export default UserPage
