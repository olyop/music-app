import {
	useRef,
	useEffect,
} from "react"

import {
	QueryResult,
	QueryHookOptions,
	useQuery as useBaseQuery,
} from "@apollo/client"

import uniqueId from "lodash/uniqueId"
import type { DocumentNode } from "graphql"

import {
	addError,
	addLoading,
	useDispatch,
	removeLoading,
} from "../redux"

export const useQuery = <Data, Vars = BaseVars>(
	query: DocumentNode,
	options: QueryHookOptions<Data, Vars>,
): QueryResult<Data> => {
	const dispatch = useDispatch()
	const queryId = useRef(uniqueId())

	const { error, loading, data, ...res } =
		useBaseQuery<Data, Vars>(query, options)

	useEffect(() => {
		if (!data && loading) {
			dispatch(addLoading(queryId.current))
		} else {
			dispatch(removeLoading(queryId.current))
		}
	}, [data, loading])

	useEffect(() => {
		if (error) {
			console.error(error)
			dispatch(addError(error))
		}
	}, [error, dispatch])

	useEffect(() => () => {
		dispatch(removeLoading(queryId.current))
	})

	return { error, loading, data, ...res }
}

type BaseVars = Record<string, unknown>