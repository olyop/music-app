import React from "react"

import { Route } from "react-router-dom"

import { propTypes, defaultProps } from "./props"

const NestedRoute = ({ path, route }) => (
  <Route
    exact={true}
    path={path + route.path}
    component={route.component}
  />
)

NestedRoute.propTypes = propTypes
NestedRoute.defaultProps = defaultProps

export default NestedRoute
