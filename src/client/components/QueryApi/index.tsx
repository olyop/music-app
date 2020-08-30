import type { DocumentNode } from "graphql"
import { useQuery, QueryResult } from "@apollo/client"
import { createElement, useEffect, Fragment, ReactNode } from "react"

import ApiError from "../ApiError"
import { useLoadingContext } from "../../contexts/Loading"

const QueryApi = <Data, Vars = Record<string, unknown>>({
	query,
	children,
	className,
	variables = {} as Vars,
}: PropTypes<Data, Vars>) => {
	const { setLoading } = useLoadingContext()
	const { error, loading, ...res } = useQuery<Data, Vars>(query, { variables })
	useEffect(() => { setLoading(loading) }, [loading, setLoading])
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
	children(res: QueryResult<Data, Vars>): ReactNode,
}

export default QueryApi