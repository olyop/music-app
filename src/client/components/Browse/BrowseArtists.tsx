import { createElement, FC } from "react"

import {
	Artist,
	UserVar,
	ArtistOrderBy,
	ArtistOrderByField,
} from "../../types"

import Helmet from "../Helmet"
import Artists from "../Artists"
import QueryApi from "../QueryApi"
import { useUserContext } from "../../contexts/User"
import GET_ARTISTS from "../../graphql/queries/artists.gql"
import { useSettingsContext } from "../../contexts/Settings"

const BrowseArtists: FC = () => {
	const userId = useUserContext()
	const { settings: { artistsOrderBy } } = useSettingsContext()
	return (
		<Helmet title="Browse Artists">
			<QueryApi<Res, Vars>
				query={GET_ARTISTS}
				variables={{ userId, orderBy: artistsOrderBy }}
				children={
					({ data }) => (
						<Artists
							orderByKey="artistsOrderBy"
							artists={data?.artists || []}
							orderByFields={Object.keys(ArtistOrderByField)}
						/>
					)
				}
			/>
		</Helmet>
	)
}

interface Res {
	artists: Artist[],
}

interface Vars extends UserVar {
	orderBy: ArtistOrderBy,
}

export default BrowseArtists