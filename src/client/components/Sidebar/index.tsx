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

// eslint-disable-next-line node/no-process-env
const UPLOAD_PORT = parseInt(process.env.UPLOAD_CLIENT_PORT!)
const ADD_URL = `http://127.0.0.1:${UPLOAD_PORT}/artist`

const bem = createBem("Sidebar")

const Sidebar: FC = () => {
	const dispatch = useDispatch()
	const sidebar = useStateSidebar()

	const handleClose =
		() => { dispatch(toggleSidebar()) }

	return sidebar ? (
		<div className={bem("")}>
			<div
				onClick={handleClose}
				className={bem("background")}
			/>
			<nav className={bem("bar", "Elevated PaddingTopBottom")}>
				<NavLink
					to="/"
					title="Library"
					onClick={handleClose}
					className={bem("section", "route", "FlexList")}
				>
					<Icon
						icon="home"
						className={bem("route-icon")}
					/>
					<p
						children="Browse"
						className={bem("route-text")}
					/>
				</NavLink>
				<NavLink
					title="Library"
					to="/library/songs"
					onClick={handleClose}
					className={bem("section", "route", "FlexList")}
				>
					<Icon
						icon="library_music"
						className={bem("route-icon")}
					/>
					<p
						children="Library"
						className={bem("route-text")}
					/>
				</NavLink>
				<a
					title="Add"
					href={ADD_URL}
					className={bem("section", "route", "FlexList")}
				>
					<Icon
						icon="open_in_new"
						className={bem("route-icon")}
					/>
					<p
						children="Add"
						className={bem("route-text")}
					/>
				</a>
			</nav>
		</div>
	) : null
}

export default Sidebar