import isEmpty from "lodash/isEmpty"
import { createElement, FC } from "react"

import {
	User,
	UserVar,
	UserSongsOrderBy,
	UserSongsOrderByField,
} from "../../types"

import Songs from "../Songs"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { useStateUserId, useStateOrderBy } from "../../redux"
import GET_USER_SONGS from "../../graphql/queries/userSongs.gql"

const LibrarySongs: FC = () => {
	const userId = useStateUserId()
	const orderBy = useStateOrderBy<UserSongsOrderBy>("userSongs")
	return (
		<Helmet title="Library Songs">
			<QueryApi<Data, Vars>
				query={GET_USER_SONGS}
				variables={{ userId, orderBy }}
				children={({ data }) => (
					<Songs
						orderByKey="userSongs"
						songs={data?.user.songs || []}
						hideOrderBy={isEmpty(data?.user.songs)}
						orderByFields={Object.keys(UserSongsOrderByField)}
					/>
				)}
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