import { createElement, FC } from "react"
import { Switch, Route } from "react-router-dom"

import routes from "./routes"
import Sidebar from "../Sidebar"
import { reactBem } from "../../helpers"
import { useSidebarContext } from "../../contexts/Sidebar"

import "./index.scss"

const bem = reactBem("Pages")

const Pages: FC = () => {
	const { sidebar } = useSidebarContext()
	return (
		<main className={bem("")}>
			{sidebar ? <Sidebar/> : null}
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