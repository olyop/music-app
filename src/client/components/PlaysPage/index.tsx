import { createElement, Fragment, FC } from "react"
import { RouteComponentProps } from "react-router-dom"

import QueryApi from "../QueryApi"
import { Song } from "../../types"
import { reactBem, deserializeDate } from "../../helpers"
import GET_SONG_PLAYS from "../../graphql/queries/songPlays.gql"

import "./index.scss"

const bem = reactBem("PlaysPage")

const PlaysPage: FC<RouteComponentProps> = () => (
	<QueryApi<TData>
		className={bem("")}
		query={GET_SONG_PLAYS}
		children={
			({ song }) => (
				<Fragment>
					{song.plays.map(
						play => (
							<p key={play.playId}>
								{deserializeDate(play.dateCreated / 86400)}
							</p>
						),
					)}
				</Fragment>
			)
		}
	/>
)

type TData = {
	song: Song,
}

export default PlaysPage