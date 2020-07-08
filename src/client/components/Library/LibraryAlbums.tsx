import { createElement, FC } from "react"

import List from "../List"
import Album from "../Album"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { User } from "../../types"
import GET_USER_ALBUMS from "../../graphql/queries/userAlbums.gql"

const LibraryAlbums: FC = () => (
	<Helmet title="Library Albums">
		<QueryApi<User>
			query={GET_USER_ALBUMS}
			children={
				({ albums }) => (
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

export default LibraryAlbums