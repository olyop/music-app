import { createElement, FC } from "react"

import List from "../List"
import Album from "../Album"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { Album as AlbumType } from "../../types"
import GET_ALBUMS from "../../graphql/queries/albums.gql"

const BrowseAlbums: FC = () => (
	<Helmet title="Browse Albums">
		<QueryApi<Data>
			query={GET_ALBUMS}
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

interface Data {
	albums: AlbumType[],
}

export default BrowseAlbums