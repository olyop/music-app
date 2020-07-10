import { BemInput } from "@oly_op/bem"
import { useQuery } from "@apollo/client"
import type { DocumentNode } from "graphql"
import isUndefined from "lodash/isUndefined"
import { createElement, Fragment, FC, ReactNode } from "react"

import Spinner from "../Spinner"
import ApiError from "../ApiError"
import { useUserContext } from "../../contexts/User"

const QueryApi: FC<PropTypes> = ({
	query,
	children,
	className,
	spinner = true,
	variables = {},
	spinnerClassName,
}) => {
	const userId =
		useUserContext()
	const { loading, error, data } =
		useQuery<unknown, Vars>(query, { variables: { ...variables, userId } })
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

interface Vars {
	userId: string,
}

interface PropTypes {
	spinner?: boolean,
	className?: string,
	query: DocumentNode,
	spinnerClassName?: BemInput,
	variables?: Record<string, string>,
	children(data: unknown): ReactNode,
}

export default QueryApi