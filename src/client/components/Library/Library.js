import React, { useContext, Fragment } from "react"

import Icon from "../Icon"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import UserCtx from "../../ctx/User"
import { Switch, Route, NavLink } from "react-router-dom"

import routes from "./routes"
import { propTypes } from "./props"
import { isUndefined } from "lodash"
import reactBem from "@oly_op/react-bem"
import { useQuery, useApolloClient } from "@apollo/react-hooks"

import GET_USER_LIBRARY from "../../graphql/queries/getUserLibrary.graphql"
import USER_LIBRARY_FRAG from "../../graphql/fragments/userLibraryFrag.graphql"

import "./Library.scss"

const bem = reactBem("Library")

const Library = ({ match }) => {
  const user = useContext(UserCtx)
  const client = useApolloClient()
  const { id } = user
  const query = GET_USER_LIBRARY
  const options = { variables: { id } }
  const { loading, error, data } = useQuery(query, options)
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const { library } = data.user
    const fragment = USER_LIBRARY_FRAG
    const userFrag = { library, __typename: "User" }
    client.writeFragment({ id, fragment, data: userFrag })
    return (
      <section className={bem("")}>
        <div className={bem("header")}>
          <div className={bem("links")}>
            {routes.map(
              route => (
                <NavLink
                  key={route.id}
                  className={bem("link")}
                  to={match.path + route.path}
                  activeClassName={bem("active")}
                  children={(
                    <Fragment>
                      <Icon
                        icon={route.icon}
                        className={bem("icon")}
                      />
                      <span
                        children={route.name}
                        className={bem("text")}
                      />
                    </Fragment>
                  )}
                />
              )
            )}
          </div>
        </div>
        <div className={bem("main")}>
          <Switch>
            {routes.map(
              route => (
                <Route
                  exact
                  key={route.id}
                  component={route.component}
                  path={match.path + route.path}
                />
              )
            )}
          </Switch>
        </div>
      </section>
    )
  }
}

Library.propTypes = propTypes

export default Library
