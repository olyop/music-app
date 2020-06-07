import { createElement, FC } from "react"
import { Switch, Route, RouteComponentProps } from "react-router-dom"

import routes from "./routes"

const Catalog: FC<RouteComponentProps> = ({ match }) => (
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

export default Catalog