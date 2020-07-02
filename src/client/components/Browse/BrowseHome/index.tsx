import { createBem } from "@oly_op/bem"
import { createElement, FC, Fragment } from "react"

import List from "../../List"
import Song from "../../Song"
import Album from "../../Album"
import QueryApi from "../../QueryApi"
import QUERY_BROWSE from "../../../graphql/queries/browse.gql"
import { Album as AlbumType, Song as SongType } from "../../../types"

import "./index.scss"

interface Data {
	newAlbums: AlbumType[],
	topTenSongs: SongType[],
}

const bem = createBem("BrowseHome")

const BrowseHome: FC = () => (
	<QueryApi<Data>
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
export default BrowseHome