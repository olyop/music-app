import { createElement, FC } from "react"
import { NavLink } from "react-router-dom"
import { createBem, BemPropTypes } from "@oly_op/bem"

import Icon from "../Icon"
import { Route } from "../../types"

import "./index.scss"

const bem = createBem("Navigation")

const Navigation: FC<PropTypes> = ({ path, routes, className }) => (
	<nav className={bem(className, "", "FlexList Content MarginBottom")}>
		{routes.map(
			route => route.ignore || (
				<NavLink
					exact
					key={route.id}
					to={path + route.path}
					className={bem("link")}
					activeClassName={bem("active")}
				>
					<Icon
						icon={route.icon!}
						className={bem("link-icon")}
					/>
					<span
						children={route.name}
						className={bem("link-text")}
					/>
				</NavLink>
			),
		)}
	</nav>
)

interface PropTypes extends BemPropTypes {
	path: string,
	routes: Route[],
}

export default Navigation