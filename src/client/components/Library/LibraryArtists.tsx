import { createElement, FC } from "react"

import {
	User,
	UserVar,
	ListStyle,
	UserArtistsOrderBy,
	UserArtistsOrderByField,
} from "../../types"

import {
	useStateUserId,
	useStateOrderBy,
	useStateListStyle,
} from "../../redux"

import Feed from "../Feed"
import Helmet from "../Helmet"
import Artists from "../Artists"
import GET_USER_ARTISTS from "./getUserArtists.gql"

const LibraryArtists: FC = () => {
	const userId = useStateUserId()
	const orderBy = useStateOrderBy<UserArtistsOrderByField>("userArtists")
	const listStyle = useStateListStyle()
	const isList = listStyle === ListStyle.LIST
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
						className={isList ? "Content" : undefined}
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