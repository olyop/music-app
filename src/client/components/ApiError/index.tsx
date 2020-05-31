import { createElement, FC } from "react"

import "./index.scss"

type PropTypes = {
	error: Error
}

const ApiError: FC<PropTypes> = ({ error }) => (
	<pre className="ApiError">
		{JSON.stringify(error, undefined, 2)}
	</pre>
)

export default ApiError