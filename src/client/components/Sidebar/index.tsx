import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"
import { NavLink } from "react-router-dom"

import Icon from "../Icon"
import { useSidebarContext } from "../../contexts/Sidebar"

import "./index.scss"

const bem = createBem("Sidebar")

const Sidebar: FC = () => {
	const { setSidebar } = useSidebarContext()
	const toggleSidebar = () => setSidebar(prevState => !prevState)
	return (
		<nav className={bem("")}>
			<NavLink
				title="Browse"
				onClick={toggleSidebar}
				className={bem("route")}
				to="/catalog/browse/songs"
			>
				<Icon className={bem("route-icon")} icon="view_list"/>
				<p className={bem("route-text")}>Browse</p>
			</NavLink>
			<NavLink
				title="Library"
				to="/library/songs"
				onClick={toggleSidebar}
				className={bem("route")}
			>
				<Icon className={bem("route-icon")} icon="library_music"/>
				<p className={bem("route-text")}>Library</p>
			</NavLink>
			<a
				title="Add"
				className={bem("route")}
				// eslint-disable-next-line node/no-process-env
				href={`http://${process.env.HOST!}:${process.env.DEV_UPLOAD_PORT!}`}
			>
				<Icon className={bem("route-icon")} icon="open_in_new"/>
				<p className={bem("route-text")}>Add</p>
			</a>
		</nav>
	)
}

export default Sidebar