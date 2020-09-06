import { createElement, FC } from "react"

import {
	User,
	UserVar,
	UserArtistsOrderBy,
	UserArtistsOrderByField,
} from "../../types"

import Feed from "../Feed"
import Helmet from "../Helmet"
import Artists from "../Artists"
import { useStateUserId, useStateOrderBy } from "../../redux"
import GET_USER_ARTISTS from "../../graphql/queries/userArtists.gql"

const LibraryArtists: FC = () => {
	const userId = useStateUserId()
	const orderBy = useStateOrderBy<UserArtistsOrderBy>("userArtists")
	return (
		<Helmet title="Library Artists">
			<Feed<Res, Vars>
				query={GET_USER_ARTISTS}
				variables={{ userId, orderBy }}
				dataToDocsLength={({ user }) => user.artists.length}
				updateQuery={(existing, incoming) => ({
					...existing,
					user: {
						...existing.user,
						artists: [
							...existing.user.artists,
							...incoming.user.artists,
						],
					},
				})}
				children={data => (
					<Artists
						orderByKey="userArtists"
						artists={data?.user.artists || []}
						orderByFields={Object.keys(UserArtistsOrderByField)}
					/>
				)}
			/>
		</Helmet>
	)
}

interface Res {
	user: User,
}

interface Vars extends UserVar {
	orderBy: UserArtistsOrderBy,
}

export default LibraryArtists