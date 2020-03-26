import React from "react"

import NestedRoute from "./NestedRoute"
import { Switch } from "react-router-dom"

import { propTypes, defaultProps } from "./props"

const NestedRouter = ({ path, routes }) => (
  <Switch>
    {routes.map(
      route => (
        <NestedRoute
          path={path}
          route={route}
          key={route.id}
        />
      ),
    )}
  </Switch>
)

NestedRouter.propTypes = propTypes
NestedRouter.defaultProps = defaultProps

export default NestedRouter
