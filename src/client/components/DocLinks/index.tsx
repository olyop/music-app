import { createElement, Fragment, ReactElement } from "react"

import DocLink from "../DocLink"

import { determineConcat, determineDocId } from "../../helpers"

const DocLinks = <T,>({ docs, ampersand = true }: PropTypes<T>): ReactElement => (
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

type PropTypes<T> = {
	docs: T[],
	ampersand?: boolean,
}

export default DocLinks