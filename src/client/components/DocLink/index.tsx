import { createElement } from "react"
import { Link } from "react-router-dom"

import {
	determineDocId,
	determineDocPath,
	determineDocName,
} from "../../helpers"

import { Doc } from "../../types"

import "./index.scss"

interface PropTypes<T> {
	doc: T,
}

const DocLink = <T extends Doc,>({ doc }: PropTypes<T>) => {
	const text = determineDocName(doc)
	return (
		<Link
			title={text}
			children={text}
			className="DocLink"
			id={determineDocId(doc)}
			to={determineDocPath(doc)}
		/>
	)
}

export default DocLink