import { createElement, FC } from "react"

import {
	User,
	UserVar,
	UserAlbumOrderBy,
	UserAlbumOrderByField,
} from "../../types"

import Albums from "../Albums"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { useUserContext } from "../../contexts/User"
import { useSettingsContext } from "../../contexts/Settings"
import GET_USER_ALBUMS from "../../graphql/queries/userAlbums.gql"

const LibraryAlbums: FC = () => {
	const userId = useUserContext()
	const { settings: { userAlbumsOrderBy } } = useSettingsContext()
	return (
		<Helmet title="Library Albums">
			<QueryApi<Res, Vars>
				query={GET_USER_ALBUMS}
				variables={{ userId, orderBy: userAlbumsOrderBy }}
				children={
					res => (
						<Albums
							orderByKey="userAlbumsOrderBy"
							albums={res ? res.user.albums : []}
							orderByFields={Object.keys(UserAlbumOrderByField)}
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
	orderBy: UserAlbumOrderBy,
}

export default LibraryAlbums