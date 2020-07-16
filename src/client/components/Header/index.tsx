import { createBem } from "@oly_op/bem"
import { NavLink } from "react-router-dom"
import { createElement, FC, Fragment } from "react"

import Icon from "../Icon"
import Loading from "../Loading"
import { useLoadingContext } from "../../contexts/Loading"
import { useSettingsContext } from "../../contexts/Settings"

import "./index.scss"

const bem = createBem("Header")

const Header: FC = () => {
	const { loading } =
		useLoadingContext()
	const { setSettings, settings: { sidebar } } =
		useSettingsContext()
	const toggleSidebar = () =>
		setSettings(prevState => ({
			...prevState,
			sidebar: !prevState.sidebar,
		}))
	return (
		<Fragment>
			{loading ? <Loading/> : null}
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
		</Fragment>
	)
}

export default Header