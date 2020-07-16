import { useQuery } from "@apollo/client"
import type { DocumentNode } from "graphql"
import isUndefined from "lodash/isUndefined"
import { createElement, useEffect, Fragment, FC, ReactNode } from "react"

import ApiError from "../ApiError"
import { useLoadingContext } from "../../contexts/Loading"

const QueryApi: FC<PropTypes> = ({
	query,
	children,
	className,
	variables = {},
}) => {
	const { setLoading } =
		useLoadingContext()
	const { loading, error, data } =
		useQuery<unknown>(query, { variables })
	useEffect(() => {
		setLoading(loading)
	}, [loading, setLoading])
	if (!isUndefined(error)) {
		return <ApiError error={error}/>
	} else if (!isUndefined(data)) {
		const render = children(data)
		if (className) {
			return <div className={className}>{render}</div>
		} else {
			return <Fragment>{render}</Fragment>
		}
	} else {
		return null
	}
}

interface PropTypes {
	className?: string,
	query: DocumentNode,
	variables?: Record<string, unknown>,
	children(data: unknown | undefined): ReactNode,
}

export default QueryApi