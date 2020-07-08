import { BemInput } from "@oly_op/bem"
import type { DocumentNode } from "graphql"
import isUndefined from "lodash/isUndefined"
import { useQuery } from "@apollo/react-hooks"
import { createElement, ReactElement, ReactNode, Fragment } from "react"

import Spinner from "../Spinner"
import ApiError from "../ApiError"
import { useUserContext } from "../../contexts/User"

const QueryApi = <Data, Vars = Record<string, unknown>>({
	query,
	children,
	className,
	spinner = true,
	spinnerClassName,
	variables = {} as Vars,
}: PropTypes<Data, Vars>): ReactElement | null => {
	const userId =
		useUserContext()
	const { loading, error, data } =
		useQuery<Data, Vars>(query, { variables: { ...variables, userId } })
	if (spinner && loading) {
		return <Spinner className={spinnerClassName}/>
	} else if (!isUndefined(error)) {
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

interface PropTypes<Data, Vars> {
	variables?: Vars,
	spinner?: boolean,
	className?: string,
	query: DocumentNode,
	spinnerClassName?: BemInput,
	children(data: Data): ReactNode,
}

export default QueryApi