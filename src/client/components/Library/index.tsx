import { createElement, FC } from "react"
import { Switch, Route, RouteComponentProps } from "react-router-dom"

import routes from "./routes"
import Helmet from "../Helmet"
import Navigation from "../Navigation"

const Library: FC<RouteComponentProps> = ({ match }) => (
	<Helmet title="Library">
		<section className="Padding">
			<h1>
				Library
			</h1>
			<Navigation
				routes={routes}
				path={match.path}
				className="MarginBottom"
			/>
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
		</section>
	</Helmet>
)

export default Library