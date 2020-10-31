import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"
import { NavLink } from "react-router-dom"

import Icon from "../Icon"
import { useDispatch, toggleSidebar } from "../../redux"

import "./index.scss"

const bem = createBem("Header")

const Header: FC = () => {
	const dispatch = useDispatch()
	const handleMenuClick = () => dispatch(toggleSidebar())
	return (
		<header className={bem("", "Elevated")}>
			<Icon
				icon="menu"
				title="Menu"
				onClick={handleMenuClick}
				className={bem("hamburger", "icon")}
			/>
			<div className="FlexList">
				<NavLink
					to="/search"
					className={bem("link")}
					children={(
						<Icon
							icon="search"
							title="Search"
							className={bem("search", "icon")}
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
							className={bem("icon")}
						/>
					)}
				/>
			</div>
		</header>
	)
}

export default Header