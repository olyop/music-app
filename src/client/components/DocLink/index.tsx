import { createElement } from "react"
import { Link } from "react-router-dom"

import {
	determineDocId,
	determineDocPath,
	determineDocName,
} from "../../helpers"

import { Doc } from "../../types"

import "./index.scss"

const DocLink = <T extends Doc,>({ doc, onClick }: PropTypes<T>) => {
	const text = determineDocName(doc)
	return (
		<Link
			title={text}
			children={text}
			onClick={onClick}
			className="DocLink"
			id={determineDocId(doc)}
			to={determineDocPath(doc)}
		/>
	)
}

interface PropTypes<T> {
	doc: T,
	onClick?: () => void,
}

export default DocLink