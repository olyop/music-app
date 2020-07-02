import { createElement } from "react"
import { Link } from "react-router-dom"

import { Doc } from "../../types"
import { determineDocPath, determineDocName } from "../../helpers"

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
			to={determineDocPath(doc)}
		/>
	)
}

export default DocLink