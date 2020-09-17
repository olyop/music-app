import { createElement, FC } from "react"

import {
	useStateUserId,
	useStateOrderBy,
	useStateListStyle,
} from "../../redux"

import {
	Artist,
	UserVar,
	ListStyle,
	ArtistsOrderBy,
	ArtistsOrderByField,
} from "../../types"

import Feed from "../Feed"
import Helmet from "../Helmet"
import Artists from "../Artists"
import GET_ARTISTS from "../../graphql/queries/artists.gql"

const BrowseArtists: FC = () => {
	const userId = useStateUserId()
	const orderBy = useStateOrderBy<ArtistsOrderBy>("artists")
	const listStyle = useStateListStyle()
	const isList = listStyle === ListStyle.LIST
	return (
		<Helmet title="Browse Artists">
			<Feed<Data, Vars>
				query={GET_ARTISTS}
				variables={{ userId, orderBy }}
				dataToDocsLength={({ artists }) => artists.length}
				updateQuery={(existing, incoming) => ({
					...existing,
					artists: [
						...existing.artists,
						...incoming.artists,
					],
				})}
				children={data => (
					<Artists
						orderByKey="artists"
						artists={data?.artists || []}
						className={isList ? "Content" : undefined}
						orderByFields={Object.keys(ArtistsOrderByField)}
					/>
				)}
			/>
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