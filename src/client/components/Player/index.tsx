import { createBem } from "@oly_op/bem"
import { createElement, FC, Fragment } from "react"
import { Link, RouteComponentProps } from "react-router-dom"

import Img from "../Img"
import Icon from "../Icon"
import Empty from "../Empty"
import Helmet from "../Helmet"
import DocLink from "../DocLink"
import QueryApi from "../QueryApi"
import Progress from "../Progress"
import SongTitle from "../SongTitle"
import UserControls from "../UserControls"
import { User, UserVar } from "../../types"
import InLibraryButton from "../InLibraryButton"
import { determineDocPath } from "../../helpers"
import FeaturingArtists from "../FeaturingArtists"
import { useUserContext } from "../../contexts/User"
import GET_USER_CURRENT from "../../graphql/queries/userCurrent.gql"

import "./index.scss"
import DocLinks from "../DocLinks"

const bem = createBem("Player")

const Player: FC<RouteComponentProps> = ({ history }) => (
	<QueryApi<Res, UserVar>
		query={GET_USER_CURRENT}
		className={bem("", "Elevated")}
		variables={{ userId: useUserContext() }}
		children={
			res => (
				<Fragment>
					<Icon
						icon="close"
						onClick={() => history.goBack()}
						className={bem("close", "PaddingQuart")}
					/>
					{!res ? null : (
						!res.user.current ? <Empty title="No Current Song"/> : (
							<Helmet title="Now Playing">
								<div className={bem("main")}>
									<Link className={bem("main-cover")} to={determineDocPath(res.user.current.album)}>
										<Img
											url={res.user.current.album.cover}
											title={res.user.current.album.title}
											className={bem("Card", "Elevated")}
										/>
									</Link>
									<div className={bem("main-title", "main-text")}>
										<h1 className={bem("main-title-text")}>
											<SongTitle
												showRemixers
												song={res.user.current}
											/>
										</h1>
										<InLibraryButton
											doc={res.user.current}
											className={bem("main-title-inLibrary")}
										/>
									</div>
									<h3 className={bem("main-artists", "main-text")}>
										<FeaturingArtists
											artists={res.user.current.artists}
											featuring={res.user.current.featuring}
										/>
									</h3>
									<h2 className={bem("main-album", "main-text")}>
										<DocLink doc={res.user.current.album}/>
										<Fragment> - </Fragment>
										<DocLinks docs={res.user.current.genres}/>
									</h2>
									<Progress
										className={bem("main-progreess")}
									/>
									<UserControls
										className={bem("main-controls")}
										iconClassName={bem("main-controls-icon")}
									/>
								</div>
							</Helmet>
						)
					)}
				</Fragment>
			)
		}
	/>
)

interface Res {
	user: User,
}

export default Player