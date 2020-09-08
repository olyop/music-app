import {
	useRef,
	Fragment,
	useEffect,
	ReactNode,
	createElement,
} from "react"

import uniqueId from "lodash/uniqueId"
import type { DocumentNode } from "graphql"
import { useQuery, QueryResult } from "@apollo/client"

import ApiError from "../ApiError"
import { useDispatch, addLoading, removeLoading } from "../../redux"

const QueryApi = <Data, Vars = Record<string, unknown>>({
	query,
	children,
	className,
	hideLoading = false,
	variables = {} as Vars,
}: PropTypes<Data, Vars>) => {
	const queryId =
		useRef(uniqueId())
	const dispatch =
		useDispatch()
	const { error, loading, data, ...res } =
		useQuery<Data, Vars>(query, { variables })

	useEffect(() => {
		if (!hideLoading) {
			if (!data && loading) {
				dispatch(addLoading(queryId.current))
			} else {
				dispatch(removeLoading(queryId.current))
			}
		}
	}, [data, loading, dispatch, hideLoading])

	if (error !== undefined) {
		return <ApiError error={error}/>
	} else {
		const render = children({ error, loading, data, ...res })
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
	hideLoading?: boolean,
	children(res: QueryResult<Data, Vars>): ReactNode,
}

export default QueryApi