import { createElement, FC } from "react"
import { ApolloError } from "@apollo/client"

import "./index.scss"

const ApiError: FC<PropTypes> = ({ error }) => (
	<pre className="ApiError">
		{JSON.stringify(error, undefined, 2)}
	</pre>
)

interface PropTypes {
	error: ApolloError,
}

export default ApiError