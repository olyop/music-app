import orderBy from "lodash/orderBy"
import { createElement, FC } from "react"

import List from "../List"
import Artist from "../Artist"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { User } from "../../types"
import GET_USER_ARTISTS from "../../graphql/queries/userArtists.gql"

const LibraryArtists: FC = () => (
	<Helmet title="Library Artists">
		<QueryApi<User>
			query={GET_USER_ARTISTS}
			children={
				({ artists }) => (
					<List>
						{orderBy(artists, "dateAdded", "desc").map(
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

export default LibraryArtists