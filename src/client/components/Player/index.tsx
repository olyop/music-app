import isNull from "lodash/isNull"
import { createBem } from "@oly_op/bem"
import isUndefined from "lodash/isUndefined"
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
						className={bem("close", "PaddingHalf")}
					/>
					{isUndefined(res) ? null : isNull(res.user.current) ? <Empty title="No Current Song"/> : (
						<Helmet title={res.user.current.title}>
							<div className={bem("main", "Padding")}>
								<Link className={bem("main-cover")} to={determineDocPath(res.user.current.album)}>
									<Img
										url={res.user.current.album.cover}
										title={res.user.current.album.title}
										className={bem("Card", "Elevated")}
									/>
								</Link>
								<h1 className={bem("main-title", "main-text")}>
									<div>
										<SongTitle
											showRemixers
											song={res.user.current}
										/>
									</div>
									<InLibraryButton
										doc={res.user.current}
										className={bem("main-title-inLibrary")}
									/>
								</h1>
								<h3 className={bem("main-artists", "main-text")}>
									<FeaturingArtists
										artists={res.user.current.artists}
										featuring={res.user.current.featuring}
									/>
								</h3>
								<h2 className={bem("main-album", "main-text")}>
									<DocLink doc={res.user.current.album}/>
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