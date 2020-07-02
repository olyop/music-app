import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"
import { NavLink } from "react-router-dom"

import Icon from "../Icon"
import { useSidebarContext } from "../../contexts/Sidebar"

import "./index.scss"

const bem = createBem("Header")

const Header: FC = () => {
	const { sidebar, toggleSidebar } = useSidebarContext()
	return (
		<header className={bem("", "Elevated")}>
			<Icon
				title="Menu"
				onClick={toggleSidebar}
				icon={sidebar ? "close" : "menu"}
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