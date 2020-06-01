import { DocumentNode } from "graphql"
import { isUndefined, isNull } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import { createElement, FC, ReactChild } from "react"

import Spinner from "../Spinner"
import ApiError from "../ApiError"
import { BemInputType } from "../../types"
import { useUserContext } from "../../contexts/User"

const QueryApi: FC<PropTypes> = ({
	query,
	children,
	spinner = true,
	variables = {},
	className = null,
	spinnerClassName = null,
}) => {
	const userId =
		useUserContext()
	const { loading, error, data } =
		useQuery(query, { variables: { userId, ...variables } })
	if (spinner && loading) {
		return <Spinner className={spinnerClassName}/>
	} else if (!isUndefined(error)) {
		return <ApiError error={error}/>
	} else if (!isNull(className)) {
		return <div className={className}>{children(data)}</div>
	} else {
		return children(data)
	}
}

type PropTypes = {
	spinner?: boolean,
	library?: boolean,
	resultPath?: string,
	query: DocumentNode,
	className: BemInputType,
	spinnerClassName?: BemInputType,
	variables?: Record<string, unknown>,
	children(data: Record<string, unknown>): ReactChild,
}

export default QueryApi