import { Link } from "react-router-dom"
import { createBem } from "@oly_op/bem"
import { createElement, ReactElement } from "react"

import { Doc } from "../../types"
import { determineDocPath, determineDocName } from "../../helpers"

import "./index.scss"

const bem = createBem("DocLink")

type PropTypes<T> = {
	doc: T,
}

const DocLink = <T extends Doc,>({ doc }: PropTypes<T>): ReactElement => {
	const text = determineDocName(doc)
	return (
		<Link
			title={text}
			children={text}
			className={bem("")}
			to={determineDocPath(doc)}
		/>
	)
}

export default DocLink