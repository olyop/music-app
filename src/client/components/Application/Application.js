import React, { useState, Fragment } from "react"

import Pages from "../Pages"
import Header from "../Header"
import Player from "../Player"
import Loading from "../Loading"
import ApiError from "../ApiError"
import PlayerBar from "../PlayerBar"
import { Switch, Route } from "react-router-dom"

import UserCtx from "../../ctx/User"
import PlayCtx from "../../ctx/Play"

import { isUndefined } from "lodash"
import { useQuery } from "@apollo/react-hooks"

import GET_USER from "../../graphql/queries/getUser.graphql"

const Main = () => (
  <Fragment>
    <Header/>
    <Pages/>
    <PlayerBar/>
  </Fragment>
)

const Application = () => {
  const id = "5e11e4aa8e0f023c5007dff9"
  const [ play, setPlay ] = useState(false)
  const queryOptions = { variables: { id } }
  const { data, loading, error } = useQuery(GET_USER, queryOptions)
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const { user } = data
    const playInit = { play, setPlay }
    return (
      <UserCtx.Provider value={user}>
        <PlayCtx.Provider value={playInit}>
          <Switch>
            <Route exact path="/player" component={Player} />
            <Route component={Main} />
          </Switch>
        </PlayCtx.Provider>
      </UserCtx.Provider>
    )
  }
}

export default Application
