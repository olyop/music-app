import { createElement, FC } from "react"

import List from "../../List"
import Song from "../../Song"
import Album from "../../Album"
import QueryApi from "../../QueryApi"
import { reactBem } from "../../../helpers"
import { Album as TAlbum, Song as TSong } from "../../../types"
import GET_BROWSE from "../../../graphql/queries/getBrowse.gql"

import "./index.scss"

const bem = reactBem("BrowseHome")

const BrowseHome: FC = () => (
	<QueryApi<TData>
		query={GET_BROWSE}
		children={
			({ newAlbums, topTenSongs }) => (
				<div className={bem("")}>
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
				</div>
			)
		}
	/>
)

type TData = {
	newAlbums: TAlbum[],
	topTenSongs: TSong[],
}

export default BrowseHome