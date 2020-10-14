import { createBem } from "@oly_op/bem"
import { NavLink } from "react-router-dom"
import { createElement, Fragment, FC } from "react"
import { useFullScreenHandle, FullScreen } from "react-full-screen"

import {
	useDispatch,
	useStateUserId,
	toggleShowVolume,
	useStateShowVolume,
} from "../../redux"

import Img from "../Img"
import Icon from "../Icon"
import Song from "../Song"
import DocLink from "../DocLink"
import DocLinks from "../DocLinks"
import QueryApi from "../QueryApi"
import Progress from "../Progress"
import Controls from "../Controls"
import SongTitle from "../SongTitle"
import { User, UserVar } from "../../types"
import InLibraryButton from "../InLibraryButton"
import FeaturingArtists from "../FeaturingArtists"
import GET_USER_CURRENT from "./getUserCurrent.gql"

import "./index.scss"

const bem = createBem("Bar")

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
						<FullScreen handle={fullscreen}>
							{fullscreen.active && (
								<div className={bem("fullscreen")}>
									<div className={bem("fullscreen-main")}>
										<Img
											url={data.user.current.album.cover}
											title={data.user.current.album.title}
											className={bem("fullscreen-cover", "Card Elevated")}
										/>
										<div className={bem("fullscreen-title", "fullscreen-text")}>
											<h1 className={bem("fullscreen-title-text")}>
												<SongTitle
													showRemixers
													song={data.user.current}
													onClick={fullscreen.exit}
												/>
											</h1>
											<InLibraryButton
												doc={data.user.current}
												className={bem("fullscreen-title-inLibrary")}
											/>
										</div>
										<h3 className={bem("fullscreen-artists", "fullscreen-text")}>
											<FeaturingArtists
												song={data.user.current}
												onClick={fullscreen.exit}
											/>
										</h3>
										<h2 className={bem("fullscreen-album", "fullscreen-text")}>
											<DocLink
												onClick={fullscreen.exit}
												doc={data.user.current.album}
											/>
											<Fragment> - </Fragment>
											<DocLinks
												onClick={fullscreen.exit}
												docs={data.user.current.genres}
											/>
										</h2>
										<Progress
											className={bem("fullscreen-progreess")}
											duration={data.user.current.duration}
										/>
										<Controls
											className={bem("fullscreen-controls")}
											iconClassName={bem("fullscreen-controls-icon")}
										/>
									</div>
								</div>
							)}
						</FullScreen>
					)}
					<footer className={bem("", "Elevated")}>
						<Controls
							className={bem("controls")}
							iconClassName={bem("icon")}
						/>
						{data && data.user.current && (
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
							</div>
						)}
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