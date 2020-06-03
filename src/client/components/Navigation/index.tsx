import { NavLink } from "react-router-dom"
import { createElement, Fragment, FC } from "react"

import Icon from "../Icon"
import { reactBem } from "../../helpers"
import { Match, Route, BemInputType } from "../../types"

import "./index.scss"

const bem = reactBem("Navigation")

const Navigation: FC<PropTypes> = ({ match, routes, className }) => (
	<nav className={bem(className, "")}>
		{routes.map(
			route => (route.ignore ? null : (
				<NavLink
					exact
					key={route.id}
					className={bem("link")}
					to={match.path + route.path}
					activeClassName={bem("active")}
					children={(
						<Fragment>
							<Icon
								icon={route.icon}
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

type PropTypes = {
	match: Match,
	routes: Route[],
	className: BemInputType,
}

export default Navigation