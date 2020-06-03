import { Link } from "react-router-dom"
import { createElement, ReactElement } from "react"

import {
	reactBem,
	determineDocPath,
	determineDocName,
} from "../../helpers"

import "./index.scss"

const bem = reactBem("DocLink")

const DocLink = <T,>({ doc }: PropTypes<T>): ReactElement => {
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

type PropTypes<T> = {
	doc: T,
}

export default DocLink