import { createBem } from "@oly_op/bem"
import { NavLink } from "react-router-dom"
import { createElement, Fragment, FC } from "react"
import { useFullScreenHandle, FullScreen } from "react-full-screen"

import Icon from "../Icon"
import Song from "../Song"
import BarAudio from "./BarAudio"
import Progress from "../Progress"
import BarVolume from "./BarVolume"
import BarControls from "./BarControls"
import { useQuery } from "../../helpers"
import BarFullscreen from "./BarFullscreen"
import { User, UserVar } from "../../types"
import { useStateUserId } from "../../redux"
import GET_USER_CURRENT from "./getUserCurrent.gql"

import "./index.scss"

const bem = createBem("Bar")

const Bar: FC = () => {
	const userId = useStateUserId()
	const variables: UserVar = { userId }
	const fullscreen = useFullScreenHandle()
	const { data } = useQuery<Data, UserVar>(GET_USER_CURRENT, { variables })
	return (
		<Fragment>
			{data?.user.current && (
				<Fragment>
					<BarAudio songId={data.user.current.songId}/>
					<FullScreen handle={fullscreen}>
						{fullscreen.active && (
							<BarFullscreen
								onExit={fullscreen.exit}
								current={data.user.current}
							/>
						)}
					</FullScreen>
				</Fragment>
			)}
			<footer className={bem("", "Elevated")}>
				<BarControls
					className={bem("controls")}
					iconClassName={bem("icon")}
				/>
				{data?.user.current && (
					<div className={bem("main")}>
						<div className={bem("main-content")}>
							<div className={bem("main-content-controls")}>
								<Icon
									icon="fullscreen"
									title="Fullscreen"
									onClick={fullscreen.enter}
									className={bem("main-content-controls-control", "icon")}
								/>
								<NavLink className={bem("main-content-controls-control")} to="/queues">
									<Icon
										title="Queue"
										icon="queue_music"
										className={bem("icon")}
									/>
								</NavLink>
								<BarVolume/>
							</div>
							<Song
								hidePlay
								showRight={false}
								song={data.user.current}
								iconClassName={bem("icon")}
								className={bem("main-content-current")}
							/>
						</div>
						<Progress
							duration={data.user.current.duration}
						/>
					</div>
				)}
			</footer>
		</Fragment>
	)
}

interface Data {
	user: User,
}

export default Bar