/* eslint-disable no-param-reassign */
import { Waypoint } from "react-waypoint"
import { createElement, FC, Fragment } from "react"

const Feed: FC<PropTypes> = ({ children, onLoadMore }) => (
	<Fragment>
		{children}
		<Waypoint
			onEnter={onLoadMore}
		/>
	</Fragment>
)

interface PropTypes {
	onLoadMore: () => void,
}

export default Feed