import { createElement, FC } from "react"
import { Switch, Route, RouteComponentProps } from "react-router-dom"

import routes from "./routes"
import Helmet from "../Helmet"
import Navigation from "../Navigation"

const Browse: FC<RouteComponentProps> = ({ match }) => (
	<Helmet title="Browse">
		<div className="PaddingTop PaddingBottom">
			<Navigation
				routes={routes}
				path={match.path}
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
	</Helmet>
)

export default Browse