import {
	useRef,
	Fragment,
	useEffect,
	ReactNode,
	createElement,
} from "react"

import {
	useQuery,
	QueryResult,
	WatchQueryFetchPolicy,
} from "@apollo/client"

import uniqueId from "lodash/uniqueId"
import type { DocumentNode } from "graphql"

import ApiError from "../ApiError"
import { useDispatch, addLoading, removeLoading } from "../../redux"

const QueryApi = <Data, Vars = Record<string, unknown>>({
	query,
	children,
	className,
	fetchPolicy,
	hideLoading = false,
	variables = {} as Vars,
}: PropTypes<Data, Vars>) => {
	const queryId =
		useRef(uniqueId())
	const dispatch =
		useDispatch()
	const { error, loading, data, ...res } =
		useQuery<Data, Vars>(query, { variables, fetchPolicy })

	useEffect(() => {
		if (!hideLoading) {
			if (!data && loading) {
				dispatch(addLoading(queryId.current))
			} else {
				dispatch(removeLoading(queryId.current))
			}
		}
	}, [data, loading, dispatch, hideLoading])

	useEffect(() => () => {
		dispatch(removeLoading(queryId.current))
	})

	if (error) {
		return <ApiError error={error}/>
	}

	const render = children({ error, loading, data, ...res })

	if (className) {
		return <div className={className}>{render}</div>
	} else {
		return <Fragment>{render}</Fragment>
	}
}

interface PropTypes<Data, Vars> {
	variables?: Vars,
	className?: string,
	query: DocumentNode,
	hideLoading?: boolean,
	fetchPolicy?: WatchQueryFetchPolicy,
	children(res: QueryResult<Data, Vars>): ReactNode,
}

export default QueryApi