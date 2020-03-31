import React, { useState } from "react"

import Pages from "../Pages"
import Header from "../Header"
import Loading from "../Loading"
import ApiError from "../ApiError"
import PlayerBar from "../PlayerBar"

import PlayContext from "../../contexts/Play"

import { isUndefined } from "lodash"
import { cache } from "../../apollo"
import { USER_ID as id } from "../../globals"
import { useQuery } from "@apollo/react-hooks"

import GET_USER from "../../graphql/queries/getUser.graphql"

const userDefault = {
  songs: [],
  albums: [],
  artists: [],
  playlists: [],
  prev: [],
  next: [],
  queue: [],
  current: [],
}

const Application = () => {
  const variables = { id }
  const { loading, error, data } = useQuery(GET_USER, { variables })
  const [ play, setPlay ] = useState(false)
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError error={error} />
  } else {
    cache.writeData({ id, data: { ...userDefault, ...data } })
    return (
      <PlayContext.Provider value={{ play, setPlay }}>
        <Header/>
        <Pages/>
        <PlayerBar/>
      </PlayContext.Provider>
    )
  }
}

export default Application
