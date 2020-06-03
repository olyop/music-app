import { DocumentNode } from "graphql"
import { isUndefined, isNull } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import { createElement, ReactElement, ReactNode, Fragment } from "react"

import Spinner from "../Spinner"
import ApiError from "../ApiError"
import { BemInputType } from "../../types"
import { useUserContext } from "../../contexts/User"

const QueryApi = <TData, TVars = Record<string, unknown>>({
	query,
	children,
	className,
	spinner = true,
	spinnerClassName,
	variables = {} as TVars,
}: PropTypes<TData, TVars>): ReactElement | null => {
	const userId =
		useUserContext()
	const { loading, error, data } =
		useQuery<TData, BVars & TVars>(query, { variables: { userId, ...variables } })
	if (spinner && loading) {
		return <Spinner className={spinnerClassName}/>
	} else if (!isUndefined(error)) {
		return <ApiError error={error}/>
	} else if (!isUndefined(data)) {
		const render = children(data)
		if (!isNull(className)) {
			return <div className={className}>{render}</div>
		} else {
			return <Fragment>{render}</Fragment>
		}
	} else {
		return null
	}
}

type BVars = {
	userId: string,
}

type PropTypes<TData, TVars> = {
	spinner?: boolean,
	variables?: TVars,
	className?: string,
	query: DocumentNode,
	spinnerClassName?: BemInputType,
	children(data: TData): ReactNode,
}

export default QueryApi