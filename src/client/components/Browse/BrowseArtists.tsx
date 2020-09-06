import { createElement, FC } from "react"

import Feed from "../Feed"
import Helmet from "../Helmet"
import Artists from "../Artists"
import GET_ARTISTS from "../../graphql/queries/artists.gql"
import { useStateUserId, useStateOrderBy } from "../../redux"
import { Artist, UserVar, ArtistsOrderBy, ArtistsOrderByField } from "../../types"

const BrowseArtists: FC = () => {
	const userId = useStateUserId()
	const orderBy = useStateOrderBy<ArtistsOrderBy>("artists")
	return (
		<Helmet title="Browse Artists">
			<Feed<Data, Vars>
				query={GET_ARTISTS}
				variables={{ userId, orderBy }}
				dataToDocsLength={({ artists }) => artists.length}
				updateQuery={(existing, incoming) => ({
					...existing,
					albums: [
						...existing.artists,
						...incoming.artists,
					],
				})}
			>
				{data => (
					<Artists
						orderByKey="artists"
						artists={data?.artists || []}
						orderByFields={Object.keys(ArtistsOrderByField)}
					/>
				)}
			</Feed>
		</Helmet>
	)
}

interface Data {
	artists: Artist[],
}

interface Vars extends UserVar {
	orderBy: ArtistsOrderBy,
}

export default BrowseArtists