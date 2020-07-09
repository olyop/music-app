import { createElement, FC } from "react"

import List from "../List"
import Album from "../Album"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { User } from "../../types"
import GET_USER_ALBUMS from "../../graphql/queries/userAlbums.gql"

const LibraryAlbums: FC = () => (
	<Helmet title="Library Albums">
		<QueryApi
			query={GET_USER_ALBUMS}
			children={
				({ user: { albums } }: Data) => (
					<List>
						{albums.map(
							album => (
								<Album
									album={album}
									key={album.albumId}
								/>
							),
						)}
					</List>
				)
			}
		/>
	</Helmet>
)

interface Data {
	user: User,
}

export default LibraryAlbums