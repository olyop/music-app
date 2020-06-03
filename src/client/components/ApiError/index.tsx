import { createElement, FC } from "react"

import "./index.scss"

const ApiError: FC<PropTypes> = ({ error }) => (
	<pre className="ApiError">
		{JSON.stringify(error, undefined, 2)}
	</pre>
)

type PropTypes = {
	error: Error,
}

export default ApiError