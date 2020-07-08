import { createElement, FC } from "react"

import List from "../List"
import Artist from "../Artist"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { Artist as ArtistType } from "../../types"
import GET_ARTISTS from "../../graphql/queries/artists.gql"

const BrowseArtists: FC = () => (
	<Helmet title="Browse Artists">
		<QueryApi<Data>
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
	</Helmet>
)

interface Data {
	artists: ArtistType[],
}

export default BrowseArtists