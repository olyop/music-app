import isEmpty from "lodash/isEmpty"
import { createElement, FC } from "react"

import {
	User,
	ListStyle,
	UserArtistsOrderBy,
	UserArtistsOrderByField,
} from "../../types"

import Feed from "../Feed"
import Helmet from "../Helmet"
import Artists from "../Artists"
import LibraryEmpty from "./LibraryEmpty"
import GET_USER_ARTISTS from "./getUserArtists.gql"
import { useStateOrderBy, useStateListStyle } from "../../redux"

const LibraryArtists: FC = () => {
	const orderBy = useStateOrderBy<UserArtistsOrderByField>("userArtists")
	const listStyle = useStateListStyle()
	const isList = listStyle === ListStyle.LIST
	return (
		<Helmet title="Library Artists">
			<Feed<Res, Vars>
				variables={{ orderBy }}
				query={GET_USER_ARTISTS}
				dataToDocsLength={({ user }) => user.artists.length}
				children={data => (data && isEmpty(data.user.artists) ? (
					<LibraryEmpty name="artists"/>
				) : (
					<Artists
						orderByKey="userArtists"
						artists={data?.user.artists}
						hideOrderBy={isEmpty(data?.user.artists)}
						className={isList ? "Content" : undefined}
						orderByFields={Object.keys(UserArtistsOrderByField)}
					/>
				))}
			/>
		</Helmet>
	)
}

interface Res {
	user: User,
}

interface Vars {
	orderBy: UserArtistsOrderBy,
}

export default LibraryArtists