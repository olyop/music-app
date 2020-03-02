import React, { useState } from "react"

import Pages from "../Pages"
import Header from "../Header"
import Player from "../Player"
import Loading from "../Loading"
import ApiError from "../ApiError"

import UserCtx from "../../ctx/User"
import PlayCtx from "../../ctx/Play"
import VolumeCtx from "../../ctx/Volume"

import { isUndefined } from "lodash"
import { useQuery } from "@apollo/react-hooks"

import GET_USER from "../../graphql/queries/getUser.graphql"

const Application = () => {
  const id = "5e11e4aa8e0f023c5007dff9"
  const [ play, togglePlay ] = useState(false)
  const [ volume, setVolume ] = useState(0.75)
  const queryOptions = { variables: { id } }
  const { data, loading, error } = useQuery(GET_USER, queryOptions)
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const { user } = data
    const playInit = { play, togglePlay }
    const volumeInit = { volume, setVolume }
    return (
      <UserCtx.Provider value={user}>
        <PlayCtx.Provider value={playInit}>
          <VolumeCtx.Provider value={volumeInit}>
            <Header/>
            <Pages/>
            <Player/>
          </VolumeCtx.Provider>
        </PlayCtx.Provider>
      </UserCtx.Provider>
    )
  }
}

export default Application
