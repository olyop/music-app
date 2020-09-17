import {
	Route,
	Switch,
	NavLink,
	useParams,
	RouteComponentProps,
} from "react-router-dom"

import { createBem } from "@oly_op/bem"
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
import InLibraryButton from "../InLibraryButton"
import { artistLower, uuidAddDashes } from "../../helpers"
import { useStateUserId, useStateOrderBy } from "../../redux"
import GET_ARTIST_PAGE from "../../graphql/queries/artistPage.gql"
import GET_ARTIST_PAGE_SONGS from "../../graphql/queries/artistSongs.gql"
import GET_ARTIST_PAGE_ALBUMS from "../../graphql/queries/artistAlbums.gql"

import "./index.scss"

const bem = createBem("ArtistPage")

const ArtistPage: FC<RouteComponentProps> = ({ match }) => {
	const userId = useStateUserId()
	const params = useParams<Params>()
	const songsOrderBy = useStateOrderBy<SongsOrderBy>("songs")
	const albumsOrderBy = useStateOrderBy<AlbumsOrderBy>("albums")
	const artistId = uuidAddDashes(params.artistId)
	const variables: Vars = { userId, artistId }
	return (
		<QueryApi<Data, Vars>
			className={bem("")}
			variables={variables}
			query={GET_ARTIST_PAGE}
			children={({ data }) => data && (
				<Helmet title={data.artist.name}>
					<Img
						url={data.artist.photo}
						className={bem("cover")}
						imgClassName={bem("cover-img")}
					>
						<div className={bem("cover-content", "Content MarginBottomOneHalf")}>
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
								{artistLower(data.artist)}
							</p>
							<p className={bem("cover-content-text")}>
								{data.artist.allPlays.toLocaleString()}
								<Fragment> plays</Fragment>
							</p>
						</div>
						<div
							className={bem("cover-black")}
						/>
					</Img>
					<div className="Elevated MarginBottomOneHalf">
						<ul className={bem("nav", "FlexList Content")}>
							<NavLink
								exact
								to={match.url}
								activeClassName={bem("nav-item-active")}
								children={(
									<li className={bem("nav-item", "Text2 Hover")}>
										Featured
									</li>
								)}
							/>
							<NavLink
								exact
								to={`${match.url}/songs`}
								activeClassName={bem("nav-item-active")}
								children={(
									<li className={bem("nav-item", "Text2 Hover")}>
										Songs
									</li>
								)}
							/>
							<NavLink
								exact
								to={`${match.url}/albums`}
								activeClassName={bem("nav-item-active")}
								children={(
									<li className={bem("nav-item", "Text2 Hover")}>
										Albums
									</li>
								)}
							/>
						</ul>
					</div>
					<div className={bem("content", "Content MarginBottomOneHalf")}>
						<Switch>
							<Route
								exact
								path={match.url}
								render={() => (
									<p className="Text2">
										Featured
									</p>
								)}
							/>
							<Route
								exact
								path={`${match.url}/albums`}
								render={() => (
									<QueryApi<Data, AlbumsVars>
										query={GET_ARTIST_PAGE_ALBUMS}
										variables={{ ...variables, albumsOrderBy }}
										children={
											({ data: albumData }) => (
												<Albums
													orderByKey="albums"
													albums={albumData?.artist.albums || []}
													orderByFields={Object.keys(AlbumsOrderByField)}
												/>
											)
										}
									/>
								)}
							/>
							<Route
								exact
								path={`${match.url}/songs`}
								render={() => (
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
								)}
							/>
						</Switch>
					</div>
				</Helmet>
			)}
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