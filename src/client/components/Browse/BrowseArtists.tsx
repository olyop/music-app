import { createElement, FC } from "react"

import Feed from "../Feed"
import Helmet from "../Helmet"
import Artists from "../Artists"
import { useUserContext } from "../../contexts/User"
import GET_ARTISTS from "../../graphql/queries/artists.gql"
import { useSettingsContext } from "../../contexts/Settings"
import { Artist, UserVar, ArtistOrderBy, ArtistOrderByField } from "../../types"

const BrowseArtists: FC = () => {
	const userId = useUserContext()
	const { settings } = useSettingsContext()
	return (
		<Helmet title="Browse Artists">
			<Feed<Data, Vars>
				dataKey="artists"
				query={GET_ARTISTS}
				parseData={({ artists }) => artists}
				variables={{ userId, orderBy: settings.artistsOrderBy }}
			>
				{data => (
					<Artists
						orderByKey="artistsOrderBy"
						artists={data?.artists || []}
						orderByFields={Object.keys(ArtistOrderByField)}
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
	orderBy: ArtistOrderBy,
}

export default BrowseArtists