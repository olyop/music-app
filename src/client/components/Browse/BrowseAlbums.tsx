import { createElement, FC } from "react"
import { RouteComponentProps } from "react-router-dom"

import List from "../List"
import Album from "../Album"
import QueryApi from "../QueryApi"
import { Album as TAlbum } from "../../types"
import GET_ALBUMS from "../../graphql/queries/albums.gql"

const BrowseAlbums: FC<RouteComponentProps> = () => (
	<QueryApi<TData>
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
)

type TData = {
	albums: TAlbum[],
}

export default BrowseAlbums