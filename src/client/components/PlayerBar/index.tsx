import { createBem } from "@oly_op/bem"
import { NavLink } from "react-router-dom"
import { createElement, Fragment, FC } from "react"

import {
	useDispatch,
	useStateUserId,
	toggleShowVolume,
	useStateShowVolume,
} from "../../redux"

import Icon from "../Icon"
import Song from "../Song"
import QueryApi from "../QueryApi"
import Progress from "../Progress"
import Controls from "../Controls"
import { User } from "../../types"
import GET_USER_CURRENT from "../../graphql/queries/userCurrent.gql"

import "./index.scss"

const bem = createBem("PlayerBar")

const PlayerBarVolume = () => {
	const dispatch = useDispatch()
	const showVolume = useStateShowVolume()
	const handleVolumeClick = () => dispatch(toggleShowVolume())
	return (
		<Icon
			title="Volume"
			onClick={handleVolumeClick}
			icon={showVolume ? "close" : "volume_up"}
			className={bem(
				"main-info-controls-control",
				"icon",
				"IconHover",
			)}
		/>
	)
}

const PlayerBar: FC = () => (
	<footer className={bem("", "Elevated")}>
		<Controls
			className={bem("controls")}
			iconClassName={bem("icon")}
		/>
		<div className={bem("main")}>
			<QueryApi<Data>
				variables={{ userId: useStateUserId() }}
				query={GET_USER_CURRENT}
				className={bem("main-info")}
				children={
					({ data }) => (
						<Fragment>
							<div className={bem("main-info-controls")}>
								<NavLink className={bem("main-info-controls-control")} to="/player">
									<Icon
										icon="fullscreen"
										title="Fullscreen"
										className={bem("icon", "IconHover")}
									/>
								</NavLink>
								<NavLink className={bem("main-info-controls-control")} to="/queues">
									<Icon
										title="Queue"
										icon="queue_music"
										className={bem("icon", "IconHover")}
									/>
								</NavLink>
								<PlayerBarVolume/>
							</div>
							{data?.user.current && (
								<Song
									showPlay={false}
									showRight={false}
									song={data.user.current}
									iconClassName={bem("icon")}
									className={bem("main-info-current")}
								/>
							)}
						</Fragment>
					)
				}
			/>
			<Progress/>
		</div>
	</footer>
)

interface Data {
	user: User,
}

export default PlayerBar