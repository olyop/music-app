import { isNull } from "lodash"
import { createElement, FC } from "react"
import { NavLink } from "react-router-dom"

import Icon from "../Icon"
import Song from "../Song"
import QueryApi from "../QueryApi"
import Progress from "../Progress"
import { User } from "../../types"
import { reactBem } from "../../helpers"
import UserControls from "../UserControls"
import GET_USER_CURRENT from "../../graphql/queries/getUserCurrent.gql"

import "./index.scss"

const bem = reactBem("PlayerBar")

const PlayerBar: FC = () => (
	<footer className={bem("", "Elevated")}>
		<UserControls
			className={bem("controls")}
			iconClassName={bem("icon")}
		/>
		<div className={bem("main")}>
			<QueryApi<TData>
				query={GET_USER_CURRENT}
				children={
					({ user }) => (
						<div className={bem("main-info")}>
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
									icon="volume_up"
									className={bem(
										"main-info-controls-control-volume",
										"main-info-controls-control",
										"icon",
										"IconHover",
									)}
								/>
							</div>
							{isNull(user.current) ? null : (
								<Song
									showPlay={false}
									showRight={false}
									song={user.current}
									inLibClassName={bem("icon")}
									className={bem("main-info-current")}
								/>
							)}
						</div>
					)
				}
			/>
			<Progress/>
		</div>
	</footer>
)

type TData = {
	user: User,
}

export default PlayerBar