import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"
import { NavLink } from "react-router-dom"

import Icon from "../Icon"
import { useDispatch, toggleSidebar, useStateSidebar } from "../../redux"

import "./index.scss"

const bem = createBem("Header")

const Header: FC = () => {
	const dispatch = useDispatch()
	const sidebar = useStateSidebar()
	const handleMenuClick = () => dispatch(toggleSidebar())
	return (
		<header className={bem("", "Elevated")}>
			<Icon
				title="Menu"
				onClick={handleMenuClick}
				icon={sidebar ? "close" : "menu"}
				className={bem("hamburger", "icon", "IconHover")}
			/>
			<div className="FlexList">
				<NavLink
					to="/search"
					className={bem("link")}
					children={(
						<Icon
							icon="search"
							title="Search"
							className={bem("search", "icon", "IconHover")}
						/>
					)}
				/>
				<NavLink
					to="/user"
					className={bem("link")}
					children={(
						<Icon
							title="Account"
							icon="account_circle"
							className={bem("icon", "IconHover")}
						/>
					)}
				/>
			</div>
		</header>
	)
}

export default Header