import isEmpty from "lodash/isEmpty"
import { createElement, FC } from "react"

import { useStateError } from "../../redux"

import "./index.scss"

const ApiError: FC = () => {
	const errors = useStateError()
	const empty = isEmpty(errors)
	if (!empty) console.error(errors)
	return empty ? null : (
		<pre className="ApiError">
			{JSON.stringify(errors, undefined, 2)}
		</pre>
	)
}

export default ApiError