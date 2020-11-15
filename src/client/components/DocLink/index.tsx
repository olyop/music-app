import { createElement } from "react"
import { Link } from "react-router-dom"
import { createBem, BemPropTypes } from "@oly_op/bem"

import {
	determineDocId,
	determineDocPath,
	determineDocName,
} from "../../helpers"

import { Doc } from "../../types"

import "./index.scss"

const bem = createBem("DocLink")

const DocLink = <T extends Doc>({ doc, onClick, className }: PropTypes<T>) => (
	<Link
		onClick={onClick}
		id={determineDocId(doc)}
		to={determineDocPath(doc)}
		title={determineDocName(doc)}
		className={bem("", className)}
		children={determineDocName(doc)}
	/>
)

interface PropTypes<T> extends BemPropTypes {
	doc: T,
	onClick?: () => void,
}

export default DocLink