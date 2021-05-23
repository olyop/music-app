import {
	useRef,
	useEffect,
} from "react"

import {
	MutationTuple,
	MutationHookOptions,
	useMutation as useBaseMutation,
} from "@apollo/client"

import uniqueId from "lodash/uniqueId"
import type { DocumentNode } from "graphql"

import { addLoading, useDispatch, removeLoading } from "../redux"

export const useMutation = <Data, Vars = Record<string, unknown>>(
	mutation: DocumentNode,
	options: MutationHookOptions<Data, Vars> = {},
): MutationTuple<Data, Vars> => {
	const dispatch = useDispatch()
	const queryId = useRef(uniqueId())

	const [ mutate, { error, loading, ...res } ] =
		useBaseMutation<Data, Vars>(mutation, options)

	useEffect(() => {
		if (loading) {
			dispatch(addLoading(queryId.current))
		} else {
			dispatch(removeLoading(queryId.current))
		}
	}, [loading])

	useEffect(() => {
		if (error) {
			console.error(error)
		}
	}, [error])

	return [ mutate, { error, loading, ...res } ]
}