import { createBem } from "@oly_op/bem"
import { NavLink } from "react-router-dom"
import { createElement, Fragment, FC } from "react"
import { useFullScreenHandle, FullScreen } from "react-full-screen"

import Icon from "../Icon"
import Song from "../Song"
import BarAudio from "./BarAudio"
import QueryApi from "../QueryApi"
import Progress from "../Progress"
import BarVolume from "./BarVolume"
import BarControls from "./BarControls"
import BarFullscreen from "./BarFullscreen"
import { User, UserVar } from "../../types"
import { useStateUserId } from "../../redux"
import GET_USER_CURRENT from "./getUserCurrent.gql"

import "./index.scss"

const bem = createBem("Bar")

const Bar: FC = () => {
	const userId = useStateUserId()
	const fullscreen = useFullScreenHandle()
	return (
		<QueryApi<Data, UserVar>
			variables={{ userId }}
			query={GET_USER_CURRENT}
			children={({ data }) => (
				<Fragment>
					{data && data.user.current && (
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
						<div className={bem("main")}>
							<div className={bem("main-content")}>
								<div className={bem("main-content-controls")}>
									<Icon
										icon="fullscreen"
										title="Fullscreen"
										onClick={fullscreen.enter}
										className={bem("main-content-controls-control", "icon", "IconHover")}
									/>
									<NavLink className={bem("main-content-controls-control")} to="/queues">
										<Icon
											title="Queue"
											icon="queue_music"
											className={bem("icon", "IconHover")}
										/>
									</NavLink>
									<BarVolume/>
								</div>
								{data?.user.current && (
									<Song
										showPlay={false}
										showRight={false}
										song={data.user.current}
										iconClassName={bem("icon")}
										className={bem("main-content-current")}
									/>
								)}
							</div>
							<Progress
								duration={data?.user.current?.duration || 0}
							/>
						</div>
					</footer>
				</Fragment>
			)}
		/>
	)
}

interface Data {
	user: User,
}

export default Bar