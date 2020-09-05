import {
	useRef,
	Fragment,
	useEffect,
	ReactNode,
	createElement,
} from "react"

import { Waypoint } from "react-waypoint"
import type { DocumentNode } from "graphql"

import QueryApi from "../QueryApi"
import { useDispatch, updateLoading } from "../../redux"

const Feed = <Data, Vars>({
	query,
	dataKey,
	children,
	parseData,
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
									if (parseData(data).length === (page.current * 30) + 30) {
										page.current += 1
										try {
											dispatch(updateLoading(true))
											await fetchMore({
												variables: {
													...variables,
													page: page.current,
												},
												updateQuery: (prev: Data, { fetchMoreResult }) => ({
													...prev,
													[dataKey]: [
														...parseData(prev),
														...parseData(fetchMoreResult!),
													],
												}),
											})
										} catch (error) {
											console.error(error)
										} finally {
											dispatch(updateLoading(false))
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
	dataKey: keyof Data,
	parseData: (data: Data) => unknown[],
	children: (data: Data | undefined) => ReactNode,
}

export default Feed