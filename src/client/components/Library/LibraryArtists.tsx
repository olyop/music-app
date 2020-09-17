import { createElement, FC } from "react"

import {
	User,
	UserVar,
	UserArtistsOrderBy,
	UserArtistsOrderByField,
} from "../../types"

import Helmet from "../Helmet"
import Artists from "../Artists"
import QueryApi from "../QueryApi"
import { useStateUserId, useStateOrderBy } from "../../redux"
import GET_USER_ARTISTS from "../../graphql/queries/userArtists.gql"

const LibraryArtists: FC = () => {
	const userId = useStateUserId()
	const orderBy = useStateOrderBy<UserArtistsOrderBy>("userArtists")
	return (
		<Helmet title="Library Artists">
			<QueryApi<Res, Vars>
				query={GET_USER_ARTISTS}
				variables={{ userId, orderBy }}
				children={({ data }) => (
					<Artists
						className="Content"
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