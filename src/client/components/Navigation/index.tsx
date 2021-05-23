import { NavLink } from "react-router-dom"
import { createElement, FC, ReactNode } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"

import Button from "../Button"
import { Route } from "../../types"

import "./index.scss"

const bem = createBem("Navigation")

const Navigation: FC<PropTypes> = ({ path, right, routes, className }) => (
	<nav className={bem(className, "", "Content")}>
		<div className={bem("links", "FlexListGap")}>
			{routes.map(
				route => route.ignore || (
					<NavLink
						exact
						key={route.id}
						to={path + route.path}
						className={bem("link")}
						activeClassName={bem("active")}
						children={(
							<Button
								text={route.name}
								icon={route.icon}
								className={bem("link-button")}
								iconClassName={bem("link-button-text")}
								textClassName={bem("link-button-text")}
							/>
						)}
					/>
				),
			)}
		</div>
		{right && (
			<div
				children={right}
				className="FlexList"
			/>
		)}
	</nav>
)

interface PropTypes extends BemPropTypes {
	path: string,
	routes: Route[],
	right?: ReactNode,
}

export default Navigation