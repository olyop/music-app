import { createElement, FC } from "react"

import Song from "../Song"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { User } from "../../types"
import GET_USER_SONGS from "../../graphql/queries/userSongs.gql"

const LibrarySongs: FC = () => (
	<Helmet title="Library Songs">
		<QueryApi
			query={GET_USER_SONGS}
			children={
				({ user: { songs } }: Data) => (
					songs.map(
						song => (
							<Song
								song={song}
								key={song.songId}
								className="PaddingHalf Hover ItemBorder"
							/>
						),
					)
				)
			}
		/>
	</Helmet>
)

interface Data {
	user: User,
}

export default LibrarySongs