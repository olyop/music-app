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
import { User, UserVar } from "../../types"
import GET_USER_CURRENT from "./getUserCurrent.gql"

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
				"main-controls-control",
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
		<QueryApi<Data, UserVar>
			className={bem("main")}
			query={GET_USER_CURRENT}
			variables={{ userId: useStateUserId() }}
			children={({ data }) => data?.user.current && (
				<Fragment>
					<div className={bem("main-content")}>
						<div className={bem("main-content-controls")}>
							<NavLink className={bem("main-content-controls-control")} to="/player">
								<Icon
									icon="fullscreen"
									title="Fullscreen"
									className={bem("icon", "IconHover")}
								/>
							</NavLink>
							<NavLink className={bem("main-content-controls-control")} to="/queues">
								<Icon
									title="Queue"
									icon="queue_music"
									className={bem("icon", "IconHover")}
								/>
							</NavLink>
							<PlayerBarVolume/>
						</div>
						<Song
							showPlay={false}
							showRight={false}
							song={data.user.current}
							iconClassName={bem("icon")}
							className={bem("main-content-current")}
						/>
					</div>
					<Progress
						duration={data.user.current.duration}
					/>
				</Fragment>
			)}
		/>
	</footer>
)

interface Data {
	user: User,
}

export default PlayerBar