import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"
import { NavLink } from "react-router-dom"

import Icon from "../Icon"
import { useDispatch, toggleSidebar } from "../../redux"

import "./index.scss"

const bem = createBem("Sidebar")

const HOST = process.env.HOST!
const PORT = process.env.DEV_UPLOAD_PORT!

const Sidebar: FC = () => {
	const dispatch = useDispatch()
	const handleRouteClick = () => dispatch(toggleSidebar())
	return (
		<nav className={bem("")}>
			<NavLink
				title="Browse"
				to="/browse/songs"
				className={bem("route")}
				onClick={handleRouteClick}
			>
				<Icon className={bem("route-icon")} icon="view_list"/>
				<p className={bem("route-text")}>Browse</p>
			</NavLink>
			<NavLink
				title="Library"
				to="/library/songs"
				className={bem("route")}
				onClick={handleRouteClick}
			>
				<Icon className={bem("route-icon")} icon="library_music"/>
				<p className={bem("route-text")}>Library</p>
			</NavLink>
			<a
				title="Add"
				className={bem("route")}
				href={`http://${HOST}:${PORT}`}
			>
				<Icon className={bem("route-icon")} icon="open_in_new"/>
				<p className={bem("route-text")}>Add</p>
			</a>
		</nav>
	)
}

export default Sidebar