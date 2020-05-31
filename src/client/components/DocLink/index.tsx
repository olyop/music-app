import { Link } from "react-router-dom"
import { createElement, FC } from "react"

import { Doc } from "../../types"

import {
	reactBem,
	determineDocPath,
	determineDocNameKey,
} from "../../helpers"

import "./index.scss"

const bem = reactBem("DocLink")

type PropTypes = {
	doc: Doc,
}

const DocLink: FC<PropTypes> = ({ doc }) => {
	const text = doc[determineDocNameKey(doc)]
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