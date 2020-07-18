import { createElement, FC } from "react"

import Helmet from "../Helmet"
import Artists from "../Artists"
import QueryApi from "../QueryApi"
import { Artist as ArtistType } from "../../types"
import { useUserContext } from "../../contexts/User"
import GET_ARTISTS from "../../graphql/queries/artists.gql"
import { useSettingsContext } from "../../contexts/Settings"

const BrowseArtists: FC = () => {
	const userId = useUserContext()
	const { settings: { artistsOrderBy } } = useSettingsContext()
	return (
		<Helmet title="Browse Artists">
			<QueryApi
				query={GET_ARTISTS}
				variables={{ userId, orderBy: artistsOrderBy }}
				children={(res: Res | undefined) => (
					res && (
						<Artists
							artists={res.artists}
							orderByIgnore={["DATE_ADDED"]}
						/>
					)
				)}
			/>
		</Helmet>
	)
}

interface Res {
	artists: ArtistType[],
}

export default BrowseArtists