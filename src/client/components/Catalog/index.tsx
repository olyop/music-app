import { createElement, FC } from "react"
import { Switch, Route } from "react-router-dom"

import routes from "./routes"
import { Match } from "../../types"

const Catalog: FC<PropTypes> = ({ match }) => (
	<Switch>
		{routes.map(
			route => (
				<Route
					key={route.id}
					component={route.component}
					path={match.path + route.path}
				/>
			),
		)}
	</Switch>
)

type PropTypes = {
	match: Match,
}

export default Catalog