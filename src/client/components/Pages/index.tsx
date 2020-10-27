import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"
import { Switch, Route } from "react-router-dom"

import routes from "./routes"

import "./index.scss"

const bem = createBem("Pages")

const Pages: FC = () => (
	<main className={bem("")}>
		<Switch>
			{routes.map(
				({ id, path, component }) => (
					<Route
						key={id}
						path={path}
						component={component}
					/>
				),
			)}
		</Switch>
	</main>
)

export default Pages