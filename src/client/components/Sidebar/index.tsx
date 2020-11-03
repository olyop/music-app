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
const ADD_URL = IS_DEV ? `http://${HOST}:${PORT}` : "/upload"

const Sidebar: FC = () => {
	const dispatch = useDispatch()
	const sidebar = useStateSidebar()
	const handleClose = () => dispatch(toggleSidebar())
	return sidebar ? (
		<div className={bem("")}>
			<div
				onClick={handleClose}
				className={bem("background")}
			/>
			<nav className={bem("bar", "Elevated")}>
				<div className={bem("section", "FlexList")}>
					<Icon
						title="Menu"
						icon="close"
						onClick={handleClose}
						className={bem("close")}
					/>
					<NavLink
						to="/"
						title="Library"
						onClick={handleClose}
					>
						<Icon
							icon="home"
							title="Home"
							className={bem("close")}
						/>
					</NavLink>
				</div>
				<NavLink
					title="Browse"
					to="/browse/songs"
					onClick={handleClose}
					className={bem("section", "route", "FlexList")}
				>
					<Icon
						icon="view_list"
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