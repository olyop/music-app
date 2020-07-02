import { BemInput } from "@oly_op/bem"
import { DocumentNode } from "graphql"
import { isUndefined, isNull } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import { createElement, ReactElement, ReactNode, Fragment } from "react"

import Spinner from "../Spinner"
import ApiError from "../ApiError"
import { useUserContext } from "../../contexts/User"

const QueryApi = <Data,>({
	query,
	children,
	className,
	spinner = true,
	variables = {},
	spinnerClassName,
}: PropTypes<Data>): ReactElement | null => {
	const userId =
		useUserContext()
	const { loading, error, data } =
		useQuery<Data, Vars>(query, { variables: { userId, ...variables } })
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

interface Vars {
	userId: string,
}

interface PropTypes<Data> {
	spinner?: boolean,
	className?: string,
	query: DocumentNode,
	spinnerClassName?: BemInput,
	children(data: Data): ReactNode,
	variables?: Record<string, unknown>,
}

export default QueryApi