import { createElement, FC } from "react"
import { RouteComponentProps } from "react-router-dom"

import List from "../List"
import Artist from "../Artist"
import QueryApi from "../QueryApi"
import { Artist as TArtist } from "../../types"
import GET_ARTISTS from "../../graphql/queries/getArtists.gql"

const BrowseArtists: FC<RouteComponentProps> = () => (
	<QueryApi<TData>
		query={GET_ARTISTS}
		children={
			({ artists }) => (
				<List>
					{artists.map(
						artist => (
							<Artist
								artist={artist}
								key={artist.artistId}
							/>
						),
					)}
				</List>
			)
		}
	/>
)

type TData = {
	artists: TArtist[],
}

export default BrowseArtists