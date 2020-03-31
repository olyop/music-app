import React from "react"

import { USER_ID } from "../../globals"
import reactBem from "@oly_op/react-bem"
import { useApolloClient } from "react-apollo"

import GET_USER_NAME_CLIENT from "../../graphql/queries/getUserNameClient.graphql"

import "./UserPage.scss"

const bem = reactBem("UserPage")

const UserPage = () => {

  const client = useApolloClient()
 
  const user = client.readQuery({
    variables: { id: USER_ID },
    query: GET_USER_NAME_CLIENT,
  })

  return (
    <div className={bem("")}>
      <h1 className={bem("name")}>{user.name}</h1>
    </div>
  )
}

export default UserPage
