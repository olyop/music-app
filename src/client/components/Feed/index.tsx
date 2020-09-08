import {
	useRef,
	Fragment,
	useEffect,
	ReactNode,
	createElement,
} from "react"

import uniqueId from "lodash/uniqueId"
import { Waypoint } from "react-waypoint"
import type { DocumentNode } from "graphql"

import QueryApi from "../QueryApi"
import { useDispatch, addLoading, removeLoading } from "../../redux"

const Feed = <Data, Vars>({
	query,
	children,
	updateQuery,
	dataToDocsLength,
	variables = {} as Vars,
}: PropTypes<Data, Vars>) => {
	const page = useRef(0)
	const dispatch = useDispatch()
	useEffect(() => () => { page.current = 0 })
	return (
		<QueryApi<Data, BaseVars & Vars>
			query={query}
			variables={{
				...variables,
				page: page.current,
			}}
			children={
				({ data, fetchMore }) => (
					<Fragment>
						{children(data)}
						{data && (
							<Waypoint
								onEnter={async () => {
									if (dataToDocsLength(data) === (page.current * 30) + 30) {
										const queryId = uniqueId()
										dispatch(addLoading(queryId))
										page.current += 1
										try {
											await fetchMore({
												variables: {
													...variables,
													page: page.current,
												},
												updateQuery: (prev: Data, { fetchMoreResult }) =>
													updateQuery(prev, fetchMoreResult!),
											})
										} catch (error) {
											console.error(error)
										} finally {
											dispatch(removeLoading(queryId))
										}
									}
								}}
							/>
						)}
					</Fragment>
				)
			}
		/>
	)
}

export interface BaseVars {
	page: number,
}

interface PropTypes<Data, Vars> {
	variables?: Vars,
	query: DocumentNode,
	dataToDocsLength: (data: Data) => number,
	children: (data: Data | undefined) => ReactNode,
	updateQuery: (existing: Data, incoming: Data) => Data,
}

export default Feed