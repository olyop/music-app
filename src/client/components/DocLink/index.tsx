import { createElement } from "react"
import { NavLink } from "react-router-dom"
import { createBem, BemPropTypes } from "@oly_op/bem"

import { Doc, Handler } from "../../types"
import { determineDocPath, determineDocName } from "../../helpers"

import "./index.scss"

const bem = createBem("DocLink")

const DocLink = <T extends Doc>({ doc, onClick, className }: PropTypes<T>) => (
	<NavLink
		onClick={onClick}
		to={determineDocPath(doc)}
		title={determineDocName(doc)}
		className={bem(className, "")}
		children={determineDocName(doc)}
	/>
)

interface PropTypes<T> extends BemPropTypes {
	doc: T,
	onClick?: Handler,
}

export default DocLink