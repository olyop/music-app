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
	addLoading,
	useDispatch,
	removeLoading,
} from "../redux"

export const useQuery = <Data, Vars = BaseVars>(
	query: DocumentNode,
	{ hideLoading = false, ...options }: Options<Data, Vars> = {},
): QueryResult<Data> => {
	const dispatch = useDispatch()
	const queryId = useRef(uniqueId())

	const { error, loading, data, ...res } =
		useBaseQuery<Data, Vars>(query, options)

	useEffect(() => {
		if (!hideLoading) {
			if (!data && loading) {
				dispatch(addLoading(queryId.current))
			} else {
				dispatch(removeLoading(queryId.current))
			}
		}
	}, [data, loading])

	useEffect(() => {
		if (error) {
			console.error(error)
		}
	}, [error, dispatch])

	useEffect(() => () => {
		if (!hideLoading) {
			dispatch(removeLoading(queryId.current))
		}
	})

	return { error, loading, data, ...res }
}

type BaseVars = Record<string, unknown>

interface Options<Data, Vars> extends QueryHookOptions<Data, Vars> {
	hideLoading?: boolean,
}