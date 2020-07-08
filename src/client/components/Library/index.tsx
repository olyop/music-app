import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"
import { Switch, Route, RouteComponentProps } from "react-router-dom"

import routes from "./routes"
import Helmet from "../Helmet"
import Navigation from "../Navigation"

import "./index.scss"

const bem = createBem("Library")

const Library: FC<RouteComponentProps> = ({ match }) => (
	<Helmet title="Library">
		<section className={bem("", "Padding")}>
			<h1 className={bem("title")}>
				Library
			</h1>
			<Navigation
				routes={routes}
				path={match.path}
			/>
			<div className={bem("main")}>
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
			</div>
		</section>
	</Helmet>
)

export default Library