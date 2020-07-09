import { createElement, FC } from "react"

import Song from "../Song"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { Song as SongType } from "../../types"
import GET_SONGS from "../../graphql/queries/songs.gql"

const BrowseSongs: FC = () => (
	<Helmet title="Browse Songs">
		<QueryApi
			query={GET_SONGS}
			className="Elevated"
			children={
				({ songs }: Data) => (
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
	songs: SongType[],
}

export default BrowseSongs