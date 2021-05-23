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
import { PAGINATION_NUM } from "@oly_op/music-app-common/globals"
import { addLoading, useDispatch, removeLoading } from "../../redux"

import QueryApi from "./QueryApi"

const Feed = <Data, Vars>({
	query,
	children,
	dataToDocsLength,
	variables = {} as Vars,
}: PropTypes<Data, Vars>) => {
	const page = useRef(0)
	const dispatch = useDispatch()
	useEffect(() => () => { page.current = 0 })
	return (
		<QueryApi<Data, BaseVars & Vars>
			query={query}
			fetchPolicy="cache-first"
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
									if (dataToDocsLength(data) === (page.current * PAGINATION_NUM) + PAGINATION_NUM) {
										const queryId = uniqueId()
										page.current += 1
										dispatch(addLoading(queryId))
										try {
											await fetchMore({
												variables: {
													...variables,
													page: page.current,
												},
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
}

export default Feed