import random from "lodash/random"
import { createBem } from "@oly_op/bem"
import { useParams } from "react-router-dom"
import { createElement, Fragment, FC } from "react"

import {
	Artist,
	UserVar,
	SongsOrderBy,
	AlbumsOrderBy,
	SongsOrderByField,
	AlbumsOrderByField,
} from "../../types"

import Img from "../Img"
import Songs from "../Songs"
import Albums from "../Albums"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { determinePlural } from "../../helpers"
import InLibraryButton from "../InLibraryButton"
import { useStateUserId, useStateOrderBy } from "../../redux"
import GET_ARTIST_PAGE from "../../graphql/queries/artistPage.gql"
import GET_ARTIST_PAGE_SONGS from "../../graphql/queries/artistSongs.gql"
import GET_ARTIST_PAGE_ALBUMS from "../../graphql/queries/artistAlbums.gql"

import "./index.scss"

const bem = createBem("ArtistPage")

const ArtistPage: FC = () => {
	const userId = useStateUserId()
	const params = useParams<Params>()
	const songsOrderBy = useStateOrderBy<SongsOrderBy>("songs")
	const albumsOrderBy = useStateOrderBy<AlbumsOrderBy>("albums")
	const variables: Vars = { userId, ...params }
	return (
		<QueryApi<Data, Vars>
			variables={variables}
			query={GET_ARTIST_PAGE}
			className={bem("", "Content")}
			children={
				({ data }) => data && (
					<Helmet title={name}>
						<Img
							url={data.artist.photo}
							imgClassName={bem("cover-img")}
							className={bem("cover", "Elevated")}
						>
							<div className={bem("cover-content", "Padding")}>
								<h1 className={bem("cover-content-name")}>
									<span className={bem("cover-content-name-text")}>
										{data.artist.name}
									</span>
									<InLibraryButton
										doc={data.artist}
										className={bem("cover-content-name-add")}
									/>
								</h1>
								<p className={bem("cover-content-text", "MarginBottomHalf")}>
									{data.artist.numOfSongs}
									<Fragment> song</Fragment>
									{determinePlural(data.artist.numOfSongs!)}
									<Fragment>, </Fragment>
									{data.artist.numOfAlbums}
									<Fragment> album</Fragment>
									{determinePlural(data.artist.numOfAlbums!)}
								</p>
								<p className={bem("cover-content-text")}>
									{random(0, 10000000).toLocaleString()}
									<Fragment> plays</Fragment>
								</p>
							</div>
							<div
								className={bem("cover-black")}
							/>
						</Img>
						<h2 className={bem("heading")}>
							Albums
						</h2>
						<QueryApi<Data, AlbumsVars>
							query={GET_ARTIST_PAGE_ALBUMS}
							variables={{ ...variables, albumsOrderBy }}
							children={
								({ data: albumData }) => (
									<Albums
										orderByKey="albums"
										className="MarginBottom"
										albums={albumData?.artist.albums || []}
										orderByFields={Object.keys(AlbumsOrderByField)}
									/>
								)
							}
						/>
						<h2 className={bem("heading")}>
							Songs
						</h2>
						<QueryApi<Data, SongsVars>
							query={GET_ARTIST_PAGE_SONGS}
							variables={{ ...variables, songsOrderBy }}
							children={
								({ data: songData }) => (
									<Songs
										orderByKey="songs"
										songs={songData?.artist.songs || []}
										orderByFields={Object.keys(SongsOrderByField)}
									/>
								)
							}
						/>
					</Helmet>
				)
			}
		/>
	)
}

interface Data {
	artist: Artist,
}

interface Params {
	artistId: string,
}

interface Vars extends UserVar, Params {}

interface SongsVars extends Vars {
	songsOrderBy: SongsOrderBy,
}

interface AlbumsVars extends Vars {
	albumsOrderBy: AlbumsOrderBy,
}

export default ArtistPage