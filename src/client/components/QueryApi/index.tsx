import { useQuery } from "@apollo/client"
import type { DocumentNode } from "graphql"
import isUndefined from "lodash/isUndefined"
import { createElement, useEffect, Fragment, ReactNode } from "react"

import ApiError from "../ApiError"
import { useLoadingContext } from "../../contexts/Loading"

const QueryApi = <Res, Vars = Record<string, unknown>>({
	query,
	children,
	className,
	variables = {} as Vars,
}: PropTypes<Res, Vars>) => {
	const { setLoading } =
		useLoadingContext()
	const { loading, error, data } =
		useQuery<Res, Vars>(query, { variables })
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

interface PropTypes<Res, Vars> {
	variables?: Vars,
	className?: string,
	query: DocumentNode,
	children(data: Res | undefined): ReactNode,
}

export default QueryApi