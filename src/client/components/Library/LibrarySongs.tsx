import isEmpty from "lodash/isEmpty"
import { createElement, FC } from "react"

import {
	User,
	UserSongsOrderBy,
	UserSongsOrderByField,
} from "../../types"

import Feed from "../Feed"
import Songs from "../Songs"
import Helmet from "../Helmet"
import LibraryEmpty from "./LibraryEmpty"
import { useStateOrderBy } from "../../redux"
import GET_USER_SONGS from "./getUserSongs.gql"

const LibrarySongs: FC = () => {
	const orderBy = useStateOrderBy<UserSongsOrderByField>("userSongs")
	return (
		<Helmet title="Library Songs">
			<Feed<Data, Vars>
				query={GET_USER_SONGS}
				variables={{ orderBy }}
				dataToDocsLength={({ user }) => user.songs.length}
				children={data => (data && isEmpty(data.user.songs) ? (
					<LibraryEmpty name="songs"/>
				) : (
					<Songs
						hidePlays
						hideIndex
						hideTrackNumber
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

interface Vars {
	orderBy: UserSongsOrderBy,
}

export default LibrarySongs