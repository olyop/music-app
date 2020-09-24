import { createBem } from "@oly_op/bem"
import { createElement, FC, Fragment } from "react"
import { Link, RouteComponentProps } from "react-router-dom"

import Img from "../Img"
import Icon from "../Icon"
import Helmet from "../Helmet"
import DocLink from "../DocLink"
import QueryApi from "../QueryApi"
import Controls from "../Controls"
import Progress from "../Progress"
import SongTitle from "../SongTitle"
import { User, UserVar } from "../../types"
import { useStateUserId } from "../../redux"
import InLibraryButton from "../InLibraryButton"
import { determineDocPath } from "../../helpers"
import FeaturingArtists from "../FeaturingArtists"
import GET_USER_CURRENT from "../../graphql/queries/userCurrent.gql"

import "./index.scss"
import DocLinks from "../DocLinks"

const bem = createBem("Player")

const Player: FC<RouteComponentProps> = ({ history }) => (
	<QueryApi<Data, UserVar>
		query={GET_USER_CURRENT}
		className={bem("", "Elevated")}
		variables={{ userId: useStateUserId() }}
		children={
			({ data }) => (
				<Fragment>
					<Icon
						icon="close"
						onClick={() => history.goBack()}
						className={bem("close", "PaddingQuart")}
					/>
					{data?.user.current && (
						<Helmet title="Now Playing">
							<div className={bem("main")}>
								<Link
									className={bem("main-cover")}
									to={determineDocPath(data.user.current.album)}
								>
									<Img
										url={data.user.current.album.cover}
										title={data.user.current.album.title}
										className={bem("Card", "Elevated")}
									/>
								</Link>
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
								/>
								<Controls
									className={bem("main-controls")}
									iconClassName={bem("main-controls-icon")}
								/>
							</div>
						</Helmet>
					)}
				</Fragment>
			)
		}
	/>
)

interface Data {
	user: User,
}

export default Player