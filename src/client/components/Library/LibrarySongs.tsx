import isEmpty from "lodash/isEmpty"
import { createElement, FC } from "react"

import {
	User,
	UserVar,
	UserSongsOrderBy,
	UserSongsOrderByField,
} from "../../types"

import Feed from "../Feed"
import Songs from "../Songs"
import Helmet from "../Helmet"
import LibraryEmpty from "./LibraryEmpty"
import GET_USER_SONGS from "./getUserSongs.gql"
import { useStateUserId, useStateOrderBy } from "../../redux"

const LibrarySongs: FC = () => {
	const userId = useStateUserId()
	const orderBy = useStateOrderBy<UserSongsOrderByField>("userSongs")
	return (
		<Helmet title="Library Songs">
			<Feed<Data, Vars>
				query={GET_USER_SONGS}
				variables={{ userId, orderBy }}
				dataToDocsLength={({ user }) => user.songs.length}
				updateQuery={(existing, incoming) => ({
					...existing,
					user: {
						...existing.user,
						songs: [
							...existing.user.songs,
							...incoming.user.songs,
						],
					},
				})}
				children={data => (data && isEmpty(data.user.songs) ? (
					<LibraryEmpty name="songs"/>
				) : (
					<Songs
						className="Content"
						orderByKey="userSongs"
						songs={data?.user.songs}
						hideOrderBy={isEmpty(data?.user.songs)}
						orderByFields={Object.keys(UserSongsOrderByField)}
					/>
				))}
			/>
		</Helmet>
	)
}

interface Data {
	user: User,
}

interface Vars extends UserVar {
	orderBy: UserSongsOrderBy,
}

export default LibrarySongs