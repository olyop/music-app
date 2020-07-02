import { createElement, FC, Fragment } from "react"

import Song from "../Song"
import QueryApi from "../QueryApi"
import { Song as TSong } from "../../types"
import GET_SONGS from "../../graphql/queries/songs.gql"

const BrowseSongs: FC = () => (
	<QueryApi<TData>
		query={GET_SONGS}
		className="Elevated"
		children={
			({ songs }) => (
				<Fragment>
					{songs.map(
						song => (
							<Song
								song={song}
								key={song.songId}
								className="PaddingHalf Hover ItemBorder"
							/>
						),
					)}
				</Fragment>
			)
		}
	/>
)

type TData = {
	songs: TSong[],
}

export default BrowseSongs