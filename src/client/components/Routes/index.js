import React from "react"

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

// import components
import Boilerplate from "../Boilerplate"

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Boilerplate} />
    </Switch>
  </Router>
)

export default Routes
