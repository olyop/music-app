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
import { USER_ID } from "../../globals"
import { useQuery } from "@apollo/react-hooks"

import GET_USER from "../../graphql/queries/getUser.graphql" 

const ApplicationInner = () => (
  <Switch>
    <Route
      exact
      path="/player"
      component={Player}
    />
    <Route
      component={() => (
        <Fragment>
          <Header/>
          <Pages/>
          <PlayerBar/>
        </Fragment>
      )}
    />
  </Switch>
)

const Application = () => {
  const [ play, setPlay ] = useState(false)
  const variables = { id: USER_ID }
  const { data, loading, error } = useQuery(GET_USER, { variables })
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    return (
      <UserCtx.Provider value={data.user}>
        <PlayCtx.Provider value={{ play, setPlay }}>
          <ApplicationInner/>
        </PlayCtx.Provider>
      </UserCtx.Provider>
    )
  }
}

export default Application
