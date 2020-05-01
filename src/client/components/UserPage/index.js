import React from "react"

import QueryApi from "../QueryApi"

import reactBem from "@oly_op/react-bem"

import GET_USER from "../../graphql/queries/getUser.gql"

import "./index.scss"

const bem = reactBem("UserPage")

const UserPage = () => (
  <div className={bem("")}>
    <QueryApi
      query={GET_USER}
      children={
        ({ user }) => (
          <h1 className={bem("name")}>
            {user.name}
          </h1>
        )
      }
    />
  </div>
)

export default UserPage
