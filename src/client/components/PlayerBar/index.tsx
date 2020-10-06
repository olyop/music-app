import { createBem } from "@oly_op/bem"
import { NavLink } from "react-router-dom"
import { createElement, Fragment, FC } from "react"
import { FullScreen, useFullScreenHandle } from "react-full-screen"

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


import Img from "../Img"
import DocLink from "../DocLink"
import DocLinks from "../DocLinks"
import SongTitle from "../SongTitle"
import { User, UserVar } from "../../types"
import { useStateUserId } from "../../redux"
import InLibraryButton from "../InLibraryButton"
import FeaturingArtists from "../FeaturingArtists"

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

const PlayerBar: FC = () => {
	const fullscreen = useFullScreenHandle()
	return (
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
						<FullScreen handle={fullscreen}>
							<div className={bem("main")}>
								<Img
									url={data.user.current.album.cover}
									title={data.user.current.album.title}
									className={bem("main-cover", "Card Elevated")}
								/>
								<div className={bem("main-title", "main-text")}>
									<h1 className={bem("main-title-text")}>
										<SongTitle
											showRemixers
											song={data.user.current}
										/>
									</h1>
									<InLibraryButton
										doc={data.user.current}
										className={bem("main-title-inLibrary")}
									/>
								</div>
								<h3 className={bem("main-artists", "main-text")}>
									<FeaturingArtists song={data.user.current}/>
								</h3>
								<h2 className={bem("main-album", "main-text")}>
									<DocLink doc={data.user.current.album}/>
									<Fragment> - </Fragment>
									<DocLinks docs={data.user.current.genres}/>
								</h2>
								<Progress
									className={bem("main-progreess")}
									duration={data.user.current.duration}
								/>
								<Controls
									className={bem("main-controls")}
									iconClassName={bem("main-controls-icon")}
								/>
							</div>
						</FullScreen>
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
}

interface Data {
	user: User,
}

export default PlayerBar