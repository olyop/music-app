import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"
import { NavLink } from "react-router-dom"

import Icon from "../Icon"
import { useDispatch, toggleSidebar } from "../../redux"
import { getUserId, uuidRemoveDashes } from "../../helpers"

import "./index.scss"

const bem = createBem("Header")

const Header: FC = () => {
	const userId = getUserId()
	const dispatch = useDispatch()

	const handleMenuClick =
		() => {
			dispatch(toggleSidebar())
		}

	return (
		<header className={bem("", "Elevated")}>
			<Icon
				icon="menu"
				title="Menu"
				onClick={handleMenuClick}
				className={bem("hamburger", "icon")}
			/>
			<div className={bem("icons", "FlexList")}>
				<NavLink
					to="/search"
					className={bem("link")}
					children={(
						<Icon
							icon="search"
							title="Search"
							className={bem("icon")}
						/>
					)}
				/>
				<NavLink
					to="/settings"
					className={bem("link")}
					children={(
						<Icon
							title="Account"
							icon="settings"
							className={bem("icon")}
						/>
					)}
				/>
				<NavLink
					to={`/user/${uuidRemoveDashes(userId)}`}
					className={bem("link")}
					children={(
						<Icon
							title="Your Page"
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