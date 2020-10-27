import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"
import { NavLink } from "react-router-dom"

import {
	useDispatch,
	toggleSidebar,
	useStateSidebar,
} from "../../redux"

import Icon from "../Icon"

import "./index.scss"

const bem = createBem("Sidebar")

const HOST = process.env.HOST!
const NODE_ENV = process.env.NODE_ENV!
const PORT = process.env.DEV_UPLOAD_PORT!
const IS_DEV = NODE_ENV === "development"

const Sidebar: FC = () => {
	const dispatch = useDispatch()
	const sidebar = useStateSidebar()
	const handleClose = () => dispatch(toggleSidebar())
	return sidebar ? (
		<nav className={bem("", "Elevated")}>
			<Icon
				title="Menu"
				icon="close"
				onClick={handleClose}
				className={bem("close")}
			/>
			<NavLink
				title="Browse"
				to="/browse/songs"
				onClick={handleClose}
				className={bem("route")}
			>
				<Icon className={bem("route-icon")} icon="view_list"/>
				<p className={bem("route-text")}>Browse</p>
			</NavLink>
			<NavLink
				title="Library"
				to="/library/songs"
				onClick={handleClose}
				className={bem("route")}
			>
				<Icon className={bem("route-icon")} icon="library_music"/>
				<p className={bem("route-text")}>Library</p>
			</NavLink>
			<a
				title="Add"
				className={bem("route")}
				href={IS_DEV ? `http://${HOST}:${PORT}` : "/upload"}
			>
				<Icon className={bem("route-icon")} icon="open_in_new"/>
				<p className={bem("route-text")}>Add</p>
			</a>
		</nav>
	) : null
}

export default Sidebar