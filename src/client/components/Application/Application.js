import React, { useState } from "react"

import Pages from "../Pages"
import Header from "../Header"
import Loading from "../Loading"
import ApiError from "../ApiError"
import PlayerBar from "../PlayerBar"

import UserContext from "../../contexts/User"
import PlayContext from "../../contexts/Play"

import { isUndefined } from "lodash"
import { USER_ID as id } from "../../globals"
import { useQuery } from "@apollo/react-hooks"

import GET_USER from "../../graphql/queries/getUser.graphql"

const Application = () => {
  const variables = { id }
  const { loading, error, data } = useQuery(GET_USER, { variables })
  const [ play, setPlay ] = useState(false)
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError error={error} />
  } else {
    return (
      <UserContext.Provider value={data.user}>
        <PlayContext.Provider value={{ play, setPlay }}>
          <Header/>
          <Pages/>
          <PlayerBar/>
        </PlayContext.Provider>
      </UserContext.Provider>
    )
  }
}

export default Application
