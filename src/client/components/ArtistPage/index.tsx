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
	useQuery,
	useMutation,
	artistLower,
	uuidAddDashes,
	determinePlural,
} from "../../helpers"

import {
	Artist,
	UserVar,
	SongsOrderBy,
	AlbumsOrderBy,
	SongsOrderByField,
	AlbumsOrderByField,
	User,
} from "../../types"

import Img from "../Img"
import Songs from "../Songs"
import Albums from "../Albums"
import Button from "../Button"
import Helmet from "../Helmet"
import DocLink from "../DocLink"
import SHUFFLE_ARTIST from "./shuffleArtist.gql"
import InLibraryButton from "../InLibraryButton"
import GET_ARTIST_PAGE from "./getArtistPage.gql"
import GET_ARTIST_PAGE_HOME from "./getArtistPageHome.gql"
import GET_ARTIST_PAGE_SONGS from "./getArtistPageSongs.gql"
import { useStateUserId, useStateOrderBy } from "../../redux"
import GET_ARTIST_PAGE_ALBUMS from "./getArtistPageAlbums.gql"

import "./index.scss"

const bem = createBem("ArtistPage")

const getArtistIdFromUrl = (url: string) => uuidAddDashes(url.slice(8, 40))

const ArtistPageHome: FC<RouteComponentProps> = ({ match }) => {
	const userId = useStateUserId()
	const artistId = getArtistIdFromUrl(match.path)
	const variables: Vars = { userId, artistId }
	const { data } = useQuery<Data, Vars>(GET_ARTIST_PAGE_HOME, { variables })
	return (
		<Fragment>
			<h1
				children="Most Played"
				className="Heading2 PaddingBottomHalf Content"
			/>
			<Songs
				showIndex
				hideCover
				hideOrderBy
				showRight={false}
				orderByKey="songs"
				className="Content"
				songs={data?.artist.topTenSongs || []}
			/>
		</Fragment>
	)
}

const ArtistPageSongs: FC<RouteComponentProps> = ({ match }) => {
	const userId = useStateUserId()
	const artistId = getArtistIdFromUrl(match.path)
	const songsOrderBy = useStateOrderBy<SongsOrderByField>("songs")
	const variables = { userId, artistId, songsOrderBy }
	const { data } = useQuery<Data, SongsVars>(GET_ARTIST_PAGE_SONGS, { variables })
	return (
		<Songs
			orderByKey="songs"
			className="Content"
			songs={data?.artist.songs || []}
			orderByFields={Object.keys(SongsOrderByField)}
		/>
	)
}

const ArtistPageAlbums: FC<RouteComponentProps> = ({ match }) => {
	const userId = useStateUserId()
	const artistId = getArtistIdFromUrl(match.path)
	const albumsOrderBy = useStateOrderBy<AlbumsOrderByField>("albums")
	const variables = { userId, artistId, albumsOrderBy }
	const { data } = useQuery<Data, AlbumsVars>(GET_ARTIST_PAGE_ALBUMS, { variables })
	return (
		<Albums
			orderByKey="albums"
			albums={data?.artist.albums || []}
			orderByFields={Object.keys(AlbumsOrderByField)}
		/>
	)
}

const ArtistPage: FC<RouteComponentProps> = ({ match }) => {
	const userId = useStateUserId()
	const params = useParams<Params>()
	const artistId = uuidAddDashes(params.artistId)
	const variables = { userId, artistId }

	const { data } =
		useQuery<Data, Vars>(GET_ARTIST_PAGE, { variables })

	const [ shuffle ] =
		useMutation<ShuffleData, Vars>(SHUFFLE_ARTIST, { variables })

	const handleShuffle = () => shuffle()

	return (
		<div className={bem("")}>
			{data && (
				<Helmet title={data.artist.name}>
					<Img
						url={data.artist.photo}
						className={bem("cover")}
						imgClassName={bem("cover-img")}
					>
						<div className={bem("cover-content", "Content PaddingBottom")}>
							<h1 className={bem("cover-content-name")}>
								<DocLink
									doc={data.artist}
									className={bem("cover-content-name-text")}
								/>
								<InLibraryButton
									doc={data.artist}
									className={bem("cover-content-name-add")}
								/>
							</h1>
							<p className={bem("cover-content-text")}>
								{artistLower(data.artist)}
							</p>
							{data.artist.playsTotal && (
								<p className={bem("cover-content-text", "MarginTopHalf")}>
									{data.artist.playsTotal.toLocaleString() ?? 0}
									<Fragment> play</Fragment>
									{determinePlural(data.artist.playsTotal)}
								</p>
							)}
							<Button
								icon="shuffle"
								text="Shuffle"
								className="MarginTop"
								onClick={handleShuffle}
							/>
						</div>
						<div
							className={bem("cover-black")}
						/>
					</Img>
					<div className="Elevated MarginBottomOneHalf">
						<ul className={bem("nav", "FlexList Content")}>
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
					<div className="MarginBottomOneHalf">
						<Switch>
							<Route
								exact
								path={match.url}
								component={ArtistPageHome}
							/>
							<Route
								exact
								path={`${match.url}/albums`}
								component={ArtistPageAlbums}
							/>
							<Route
								exact
								path={`${match.url}/songs`}
								component={ArtistPageSongs}
							/>
						</Switch>
					</div>
				</Helmet>
			)}
		</div>
	)
}

interface Data {
	artist: Artist,
}

interface Params {
	artistId: string,
}

interface ShuffleData {
	shuffleArtist: User,
}

interface Vars extends UserVar, Params {}

interface SongsVars extends Vars {
	songsOrderBy: SongsOrderBy,
}

interface AlbumsVars extends Vars {
	albumsOrderBy: AlbumsOrderBy,
}

export default ArtistPage