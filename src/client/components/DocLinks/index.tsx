import { createElement, Fragment } from "react"

import DocLink from "../DocLink"
import { Doc, Handler } from "../../types"
import { determineDocId } from "../../helpers"
import determineConcat from "./determineConcat"

const DocLinks = <T extends Doc>({
	docs,
	onClick,
	ampersand = true,
}: PropTypes<T>) => (
	<Fragment>
		{docs.map(
			(doc, index) => (
				<Fragment key={determineDocId(doc)}>
					<DocLink doc={doc} onClick={onClick}/>
					{determineConcat(docs, index, ampersand)}
				</Fragment>
			),
		)}
	</Fragment>
)

interface PropTypes<T> {
	docs: T[],
	onClick?: Handler,
	ampersand?: boolean,
}

export default DocLinks