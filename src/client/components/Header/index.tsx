import isEmpty from "lodash/isEmpty"
import { createBem } from "@oly_op/bem"
import { NavLink } from "react-router-dom"
import { createElement, FC, Fragment } from "react"

import {
	useDispatch,
	toggleSidebar,
	useStateLoading,
	useStateSidebar,
} from "../../redux"

import Icon from "../Icon"

import "./index.scss"

const bem = createBem("Header")

const Header: FC = () => {
	const dispatch = useDispatch()
	const loading = useStateLoading()
	const sidebar = useStateSidebar()
	const handleMenuClick = () => dispatch(toggleSidebar())
	return (
		<Fragment>
			{!isEmpty(loading) ? (
				<div className={bem("loading")}>
					<div className={bem("loading-line")}/>
					<div className={bem("loading-subline", "loading-asc")}/>
					<div className={bem("loading-subline", "loading-desc")}/>
				</div>
			) : null}
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
		</Fragment>
	)
}

export default Header