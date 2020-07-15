import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import List from "../../List"
import Song from "../../Song"
import Album from "../../Album"
import Helmet from "../../Helmet"
import QueryApi from "../../QueryApi"
import { useUserContext } from "../../../contexts/User"
import QUERY_BROWSE from "../../../graphql/queries/browse.gql"
import { Album as AlbumType, Song as SongType } from "../../../types"

import "./index.scss"

const bem = createBem("BrowseHome")

const BrowseHome: FC = () => (
	<QueryApi
		className={bem("")}
		query={QUERY_BROWSE}
		variables={{ userId: useUserContext() }}
		children={
			({ newAlbums, topTenSongs }: Data) => (
				<Helmet title="Browse">
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
				</Helmet>
			)
		}
	/>
)

interface Data {
	newAlbums: AlbumType[],
	topTenSongs: SongType[],
}

export default BrowseHome