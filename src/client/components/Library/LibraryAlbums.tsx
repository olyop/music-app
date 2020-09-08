import { createElement, FC } from "react"

import {
	User,
	UserVar,
	UserAlbumsOrderBy,
	UserAlbumsOrderByField,
} from "../../types"

import Albums from "../Albums"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { useStateUserId, useStateOrderBy } from "../../redux"
import GET_USER_ALBUMS from "../../graphql/queries/userAlbums.gql"

const LibraryAlbums: FC = () => {
	const userId = useStateUserId()
	const orderBy = useStateOrderBy<UserAlbumsOrderBy>("userAlbums")
	return (
		<Helmet title="Library Albums">
			<QueryApi<Data, Vars>
				query={GET_USER_ALBUMS}
				variables={{ userId, orderBy }}
				children={({ data }) => (
					<Albums
						orderByKey="userAlbums"
						albums={data?.user.albums || []}
						orderByFields={Object.keys(UserAlbumsOrderByField)}
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
	orderBy: UserAlbumsOrderBy,
}

export default LibraryAlbums