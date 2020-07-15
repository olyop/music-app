import { BemInput } from "@oly_op/bem"
import { useQuery } from "@apollo/client"
import type { DocumentNode } from "graphql"
import isUndefined from "lodash/isUndefined"
import { createElement, Fragment, FC, ReactNode } from "react"

import Spinner from "../Spinner"
import ApiError from "../ApiError"

const QueryApi: FC<PropTypes> = ({
	query,
	children,
	className,
	spinner = true,
	variables = {},
	spinnerClassName,
}) => {
	const { loading, error, data } =
		useQuery<unknown>(query, { variables })
	if (spinner && loading) {
		return <Spinner className={spinnerClassName}/>
	} else if (!isUndefined(error)) {
		return <ApiError error={error}/>
	} else {
		const render = children(data)
		if (className) {
			return <div className={className}>{render}</div>
		} else {
			return <Fragment>{render}</Fragment>
		}
	}
}

interface PropTypes {
	spinner?: boolean,
	className?: string,
	query: DocumentNode,
	spinnerClassName?: BemInput,
	children(data: unknown): ReactNode,
	variables?: Record<string, unknown>,
}

export default QueryApi