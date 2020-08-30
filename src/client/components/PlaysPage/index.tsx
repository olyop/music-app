import { createElement, Fragment, FC } from "react"

import QueryApi from "../QueryApi"
import { Song } from "../../types"
import { deserializeDate } from "../../helpers"
import GET_SONG_PLAYS from "../../graphql/queries/songPlays.gql"

import "./index.scss"

const PlaysPage: FC = () => (
	<QueryApi<Data>
		className="PlaysPage"
		query={GET_SONG_PLAYS}
		children={
			({ data }) => data && (
				<Fragment>
					{data.song.plays.map(
						play => (
							<p key={play.playId}>
								{deserializeDate(play.dateCreated)}
							</p>
						),
					)}
				</Fragment>
			)
		}
	/>
)

interface Data {
	song: Song,
}

export default PlaysPage