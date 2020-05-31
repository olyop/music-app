import { NavLink } from "react-router-dom"
import { createElement, useContext } from "react"

import Icon from "../Icon"
import SidebarContext from "../../contexts/Sidebar"

import { reactBem } from "../../helpers"

import "./index.scss"

const bem = reactBem("Header")

const Header = () => {
	const { sidebar, toggleSidebar } = useContext(SidebarContext)
	return (
		<header className={bem("", "Elevated")}>
			<Icon
				title="Menu"
				onClick={toggleSidebar}
				icon={sidebar === "open" ? "close" : "menu"}
				className={bem("hamburger", "icon", "IconHover")}
			/>
			<div className={bem("right")}>
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