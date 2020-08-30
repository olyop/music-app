import { createElement, FC } from "react"

import {
	User,
	UserVar,
	UserArtistOrderBy,
	UserArtistOrderByField,
} from "../../types"

import Helmet from "../Helmet"
import Artists from "../Artists"
import QueryApi from "../QueryApi"
import { useUserContext } from "../../contexts/User"
import { useSettingsContext } from "../../contexts/Settings"
import GET_USER_ARTISTS from "../../graphql/queries/userArtists.gql"

const LibraryArtists: FC = () => {
	const userId = useUserContext()
	const { settings: { userArtistsOrderBy } } = useSettingsContext()
	return (
		<Helmet title="Library Artists">
			<QueryApi<Res, Vars>
				query={GET_USER_ARTISTS}
				variables={{ userId, orderBy: userArtistsOrderBy }}
				children={
					({ data }) => (
						<Artists
							orderByKey="userArtistsOrderBy"
							artists={data?.user.artists || []}
							orderByFields={Object.keys(UserArtistOrderByField)}
						/>
					)
				}
			/>
		</Helmet>
	)
}

interface Res {
	user: User,
}

interface Vars extends UserVar {
	orderBy: UserArtistOrderBy,
}

export default LibraryArtists