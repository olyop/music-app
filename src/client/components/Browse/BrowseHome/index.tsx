import { createElement, FC, Fragment } from "react"
import { RouteComponentProps } from "react-router-dom"

import List from "../../List"
import Song from "../../Song"
import Album from "../../Album"
import QueryApi from "../../QueryApi"
import { reactBem } from "../../../helpers"
import QUERY_BROWSE from "../../../graphql/queries/browse.gql"
import { Album as TAlbum, Song as TSong } from "../../../types"

import "./index.scss"

const bem = reactBem("BrowseHome")

const BrowseHome: FC<RouteComponentProps> = () => (
	<QueryApi<TData>
		query={QUERY_BROWSE}
		className={bem("")}
		children={
			({ newAlbums, topTenSongs }) => (
				<Fragment>
					<div className={bem("newAlbums")}>
						<h2 className={bem("heading")}>New Albums</h2>
						<List>
							{newAlbums.map(
								album => (
									<Album
										album={album}
										key={album.albumId}
									/>
								),
							)}
						</List>
					</div>
					<div className={bem("topTen")}>
						<h2 className={bem("heading")}>Top 10</h2>
						{topTenSongs.map(
							song => (
								<Song
									song={song}
									key={song.songId}
								/>
							),
						)}
					</div>
				</Fragment>
			)
		}
	/>
)

type TData = {
	newAlbums: TAlbum[],
	topTenSongs: TSong[],
}

export default BrowseHome