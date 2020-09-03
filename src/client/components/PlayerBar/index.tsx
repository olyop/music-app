import { createBem } from "@oly_op/bem"
import { NavLink } from "react-router-dom"
import { createElement, Fragment, FC } from "react"

import Icon from "../Icon"
import Song from "../Song"
import QueryApi from "../QueryApi"
import Progress from "../Progress"
import { User } from "../../types"
import VolumeSlider from "../VolumeSlider"
import UserControls from "../UserControls"
import { useUserContext } from "../../contexts/User"
import { useShowVolumeContext } from "../../contexts/ShowVolume"
import GET_USER_CURRENT from "../../graphql/queries/userCurrent.gql"

import "./index.scss"

const bem = createBem("PlayerBar")

const PlayerBar: FC = () => {
	const { showVolume, setShowVolume } = useShowVolumeContext()
	return (
		<footer className={bem("", "Elevated")}>
			<UserControls
				className={bem("controls")}
				iconClassName={bem("icon")}
			/>
			<div className={bem("main")}>
				<QueryApi<Data>
					query={GET_USER_CURRENT}
					className={bem("main-info")}
					variables={{ userId: useUserContext() }}
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
									<Icon
										title="Volume"
										icon={showVolume ? "close" : "volume_up"}
										onClick={() => setShowVolume(prevState => !prevState)}
										className={bem(
											"main-info-controls-control",
											"icon",
											"IconHover",
										)}
									/>
									{showVolume && <VolumeSlider/>}
								</div>
								{data && data.user.current && (
									<Song
										showPlay={false}
										showRight={false}
										song={data.user.current}
										inLibClassName={bem("icon")}
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
}

interface Data {
	user: User,
}

export default PlayerBar