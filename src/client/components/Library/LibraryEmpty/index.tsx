import { createBem } from "@oly_op/bem"
import { NavLink } from "react-router-dom"
import { createElement, FC, Fragment } from "react"

import "./index.scss"

const bem = createBem("LibraryEmpty")

const LibraryEmpty: FC = () => (
	<div className={bem("", "Content PaddingBottom")}>
		<h2 className={bem("heading", "MarginBottomHalf")}>
			Empty
		</h2>
		<h3 className={bem("text")}>
			<NavLink
				to="/"
				children="Browse"
				className={bem("link")}
			/>
			<Fragment> or </Fragment>
			<NavLink
				children="search"
				to="/search?query="
				className={bem("link")}
			/>
			<Fragment> to add music.</Fragment>
		</h3>
	</div>
)

export default LibraryEmpty