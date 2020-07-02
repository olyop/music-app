import { createElement, Fragment } from "react"

import DocLink from "../DocLink"
import { Doc } from "../../types"
import { determineConcat, determineDocId } from "../../helpers"

const DocLinks = <T extends Doc,>({ docs, ampersand = true }: PropTypes<T>) => (
	<Fragment>
		{docs.map(
			(doc, index) => (
				<Fragment key={determineDocId(doc)}>
					<DocLink doc={doc}/>
					{determineConcat(docs, index, ampersand)}
				</Fragment>
			),
		)}
	</Fragment>
)

interface PropTypes<T> {
	docs: T[],
	ampersand?: boolean,
}

export default DocLinks