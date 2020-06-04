import { createElement, FC } from "react"
import { Switch, Route } from "react-router-dom"

import routes from "./routes"
import { Match } from "../../types"
import Navigation from "../Navigation"

const Browse: FC<PropTypes> = ({ match }) => (
	<div className="Padding">
		<Navigation
			match={match}
			routes={routes}
			className="MarginBottom"
		/>
		<Switch>
			{routes.map(
				route => (
					<Route
						exact
						key={route.id}
						component={route.component}
						path={match.path + route.path}
					/>
				),
			)}
		</Switch>
	</div>
)

type PropTypes = {
	match: Match,
}

export default Browse