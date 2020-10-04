import { createBem } from "@oly_op/bem"
import { FC, Fragment, createElement } from "react"
import { RouteComponentProps } from "react-router-dom"

import Img from "../Img"
import Icon from "../Icon"
import Helmet from "../Helmet"
import DocLink from "../DocLink"
import DocLinks from "../DocLinks"
import QueryApi from "../QueryApi"
import Controls from "../Controls"
import Progress from "../Progress"
import SongTitle from "../SongTitle"
import { User, UserVar } from "../../types"
import { useStateUserId } from "../../redux"
import InLibraryButton from "../InLibraryButton"
import FeaturingArtists from "../FeaturingArtists"
import GET_USER_CURRENT from "./getUserCurrent.gql"

import "./index.scss"

const bem = createBem("Player")

const Player: FC<RouteComponentProps> = ({ history }) => (
	<QueryApi<Data, UserVar>
		query={GET_USER_CURRENT}
		className={bem("", "Elevated")}
		variables={{ userId: useStateUserId() }}
		children={({ data }) => (
			<Helmet title="Now Playing">
				<Icon
					icon="close"
					onClick={() => history.goBack()}
					className={bem("close", "PaddingQuart")}
				/>
				{data?.user.current && (
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
				)}
			</Helmet>
		)}
	/>
)

interface Data {
	user: User,
}

export default Player