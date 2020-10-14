import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"
import { Switch, Route, RouteComponentProps } from "react-router-dom"

import routes from "./routes"
import Helmet from "../Helmet"
import Navigation from "../Navigation"

import "./index.scss"

const bem = createBem("Browse")

const Browse: FC<RouteComponentProps> = ({ match }) => (
	<Helmet title="Browse">
		<div className={bem("")}>
			<Navigation
				routes={routes}
				path={match.path}
				className={bem("nav")}
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