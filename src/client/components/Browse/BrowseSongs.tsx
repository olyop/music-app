import { createElement, FC, Fragment } from "react"
import { RouteComponentProps } from "react-router-dom"

import Song from "../Song"
import QueryApi from "../QueryApi"
import { Song as TSong } from "../../types"
import GET_SONGS from "../../graphql/queries/getSongs.gql"

const BrowseSongs: FC<RouteComponentProps> = () => (
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
						)
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