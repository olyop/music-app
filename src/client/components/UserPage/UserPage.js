import React, { useContext } from "react"
 
import UserCtx from "../../ctx/User"

import reactBem from "@oly_op/react-bem"

import "./UserPage.scss"

const bem = reactBem("UserPage")

const UserPage = () => {
  const user = useContext(UserCtx)
  return (
    <div className={bem("")}>
      <h1 className={bem("name")}>{user.name}</h1>
    </div>
  )
}

export default UserPage
