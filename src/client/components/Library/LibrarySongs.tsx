import { createElement, FC } from "react"

import Song from "../Song"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { User } from "../../types"
import { useUserContext } from "../../contexts/User"
import GET_USER_SONGS from "../../graphql/queries/userSongs.gql"

const LibrarySongs: FC = () => (
	<Helmet title="Library Songs">
		<QueryApi
			className="Elevated"
			query={GET_USER_SONGS}
			variables={{ userId: useUserContext() }}
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