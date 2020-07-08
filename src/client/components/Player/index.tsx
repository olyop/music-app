import isNull from "lodash/isNull"
import { createBem } from "@oly_op/bem"
import { createElement, FC, Fragment } from "react"
import { RouteComponentProps } from "react-router-dom"

import Img from "../Img"
import Icon from "../Icon"
import Empty from "../Empty"
import Helmet from "../Helmet"
import DocLink from "../DocLink"
import QueryApi from "../QueryApi"
import { User } from "../../types"
import Progress from "../Progress"
import SongTitle from "../SongTitle"
import FeaturingArtists from "../FeaturingArtists"
import GET_USER_CURRENT from "../../graphql/queries/userCurrent.gql"

import "./index.scss"

const bem = createBem("Player")

const Player: FC<RouteComponentProps> = ({ history }) => (
	<QueryApi<Data>
		query={GET_USER_CURRENT}
		className={bem("", "Elevated")}
		spinnerClassName={bem("spinner")}
		children={
			({ user }) => (
				<Fragment>
					<Icon
						icon="close"
						onClick={() => history.goBack()}
						className={bem("close", "PaddingHalf")}
					/>
					{isNull(user.current) ? <Empty title="No Current Song"/> : (
						<Helmet title={user.current.title}>
							<div className={bem("main", "Padding")}>
								<Img
									url={user.current.album.cover}
									title={user.current.album.title}
									className={bem("main-cover", "Card", "Elevated")}
								/>
								<h1 className={bem("main-title", "main-text")}>
									<SongTitle
										showRemixers
										song={user.current}
									/>
								</h1>
								<h2 className={bem("main-album", "main-text")}>
									<DocLink doc={user.current.album}/>
								</h2>
								<h3 className={bem("main-artists", "main-text")}>
									<FeaturingArtists
										artists={user.current.artists}
										featuring={user.current.featuring}
									/>
								</h3>
								<Progress className={bem("main-progreess")}/>
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