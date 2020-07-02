import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"
import { NavLink } from "react-router-dom"

import Icon from "../Icon"
import { useSidebarContext } from "../../contexts/Sidebar"

import "./index.scss"

const bem = createBem("Sidebar")

const Sidebar: FC = () => {
	const { toggleSidebar } = useSidebarContext()
	return (
		<nav className={bem("")}>
			<NavLink
				title="Browse"
				to="/catalog/browse"
				onClick={toggleSidebar}
				className={bem("route")}
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
			<NavLink
				to="/add"
				title="Add"
				onClick={toggleSidebar}
				className={bem("route")}
			>
				<Icon className={bem("route-icon")} icon="add_circle"/>
				<p className={bem("route-text")}>Add Music</p>
			</NavLink>
		</nav>
	)
}

export default Sidebar