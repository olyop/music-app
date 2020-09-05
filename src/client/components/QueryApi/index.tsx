import type { DocumentNode } from "graphql"
import { createElement, useEffect, Fragment, ReactNode } from "react"
import { useQuery, QueryResult, WatchQueryFetchPolicy } from "@apollo/client"

import ApiError from "../ApiError"
import { useDispatch, updateLoading } from "../../redux"

const QueryApi = <Data, Vars = Record<string, unknown>>({
	query,
	children,
	className,
	fetchPolicy,
	variables = {} as Vars,
}: PropTypes<Data, Vars>) => {
	const dispatch =
		useDispatch()
	const { error, loading, ...res } =
		useQuery<Data, Vars>(query, { variables, fetchPolicy })

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { dispatch(updateLoading(loading)) }, [loading])

	if (error !== undefined) {
		return <ApiError error={error}/>
	} else {
		const render = children({ error, loading, ...res })
		if (className) {
			return <div className={className}>{render}</div>
		} else {
			return <Fragment>{render}</Fragment>
		}
	}
}

interface PropTypes<Data, Vars> {
	variables?: Vars,
	className?: string,
	query: DocumentNode,
	fetchPolicy?: WatchQueryFetchPolicy,
	children(res: QueryResult<Data, Vars>): ReactNode,
}

export default QueryApi