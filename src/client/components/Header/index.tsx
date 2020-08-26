import { createBem } from "@oly_op/bem"
import { NavLink } from "react-router-dom"
import { createElement, FC, Fragment } from "react"

import Icon from "../Icon"
import Loading from "../Loading"
import { useSidebarContext } from "../../contexts/Sidebar"
import { useLoadingContext } from "../../contexts/Loading"

import "./index.scss"

const bem = createBem("Header")

const Header: FC = () => {
	const { loading } = useLoadingContext()
	const { sidebar, setSidebar } = useSidebarContext()
	const toggleSidebar = () => setSidebar(prevState => !prevState)
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
		</Fragment>
	)
}

export default Header