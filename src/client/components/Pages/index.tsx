import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"
import { Switch, Route } from "react-router-dom"

import routes from "./routes"
import Sidebar from "../Sidebar"
import { useSidebarContext } from "../../contexts"

import "./index.scss"

const bem = createBem("Pages")

const Pages: FC = () => {
	const { sidebar } = useSidebarContext()
	return (
		<main className={bem("")}>
			{sidebar && <Sidebar/>}
			<div className={bem("content")}>
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
			</div>
		</main>
	)
}

export default Pages