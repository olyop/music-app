import { NavLink } from "react-router-dom"
import { createBem, BemInput } from "@oly_op/bem"
import { createElement, Fragment, FC } from "react"

import Icon from "../Icon"
import { Route } from "../../types"

import "./index.scss"

const bem = createBem("Navigation")

const Navigation: FC<PropTypes> = ({ path, routes, className }) => (
	<nav className={bem(className, "")}>
		{routes.map(
			route => (route.ignore ? null : (
				<NavLink
					exact
					key={route.id}
					to={path + route.path}
					className={bem("link")}
					activeClassName={bem("active")}
					children={(
						<Fragment>
							<Icon
								icon={route.icon!}
								className={bem("link-icon")}
							/>
							<span
								children={route.name}
								className={bem("link-text")}
							/>
						</Fragment>
					)}
				/>
			)),
		)}
	</nav>
)

interface PropTypes {
	path: string,
	routes: Route[],
	className?: BemInput,
}

export default Navigation