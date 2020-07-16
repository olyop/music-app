import { createElement, FC } from "react"

import Helmet from "../Helmet"
import Artists from "../Artists"
import QueryApi from "../QueryApi"
import { Artist as ArtistType } from "../../types"
import GET_ARTISTS from "../../graphql/queries/artists.gql"
import { useSettingsContext } from "../../contexts/Settings"

const BrowseArtists: FC = () => {
	const { settings: { artistsOrderBy } } = useSettingsContext()
	return (
		<Helmet title="Browse Artists">
			<QueryApi
				query={GET_ARTISTS}
				variables={{ orderBy: artistsOrderBy }}
				children={
					(res: Res | undefined) => (
						res && <Artists artists={res.artists}/>
					)
				}
			/>
		</Helmet>
	)
}

interface Res {
	artists: ArtistType[],
}

export default BrowseArtists