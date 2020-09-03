import random from "lodash/random"
import isEmpty from "lodash/isEmpty"
import { createBem } from "@oly_op/bem"
import { Waypoint } from "react-waypoint"
import { useParams } from "react-router-dom"
import { useState, createElement, Fragment, FC } from "react"

import {
	Artist,
	UserVar,
	SongOrderBy,
	AlbumOrderBy,
	SongOrderByField,
	AlbumOrderByField,
} from "../../types"

import Img from "../Img"
import Songs from "../Songs"
import Albums from "../Albums"
import Helmet from "../Helmet"
import QueryApi from "../QueryApi"
import { determinePlural } from "../../helpers"
import InLibraryButton from "../InLibraryButton"
import { useUserContext } from "../../contexts/User"
import { useSettingsContext } from "../../contexts/Settings"
import GET_ARTIST_PAGE from "../../graphql/queries/artistPage.gql"

import "./index.scss"

const bem = createBem("ArtistPage")

const ArtistPage: FC = () => {
	const userId = useUserContext()
	const params = useParams<Params>()
	const [ showHeader, setShowHeader ] = useState(false)
	const onLeave = () => setShowHeader(prevState => !prevState)
	const { settings: { songsOrderBy, albumsOrderBy } } = useSettingsContext()
	const variables = { userId, songsOrderBy, albumsOrderBy, ...params }
	if (showHeader) console.log(showHeader)
	return (
		<QueryApi<Data, Vars>
			className={bem("")}
			variables={variables}
			query={GET_ARTIST_PAGE}
			children={
				({ data }) => {
					if (!data) return null
					const { artist } = data
					const { name, photo, songs, albums } = artist
					return (
						<Helmet title={name}>
							<Img
								url={photo}
								imgClassName={bem("cover-img")}
								className={bem("cover", "Elevated")}
							>
								<Waypoint onLeave={onLeave}>
									<div className={bem("cover-content", "Padding")}>
										<h1 className={bem("cover-content-name")}>
											<span className={bem("cover-content-name-text")}>{name}</span>
											<InLibraryButton
												doc={artist}
												className={bem("cover-content-name-add")}
											/>
										</h1>
										<p className={bem("cover-content-text", "MarginBottomHalf")}>
											{songs.length}
											<Fragment> song</Fragment>
											{determinePlural(songs.length)}
											{isEmpty(albums) ? null : (
												<Fragment>
													<Fragment>, </Fragment>
													{albums.length}
													<Fragment> album</Fragment>
													{determinePlural(albums.length)}
												</Fragment>
											)}
										</p>
										<p className={bem("cover-content-text")}>
											{random(0, 100000000).toLocaleString()}
											<Fragment> plays</Fragment>
										</p>
									</div>
								</Waypoint>
								<div
									className={bem("cover-black")}
								/>
							</Img>
							<div className="Padding">
								{isEmpty(albums) ? null : (
									<Fragment>
										<h2 className={bem("heading")}>Albums</h2>
										<Albums
											albums={albums}
											className="MarginBottom"
											orderByKey="albumsOrderBy"
											orderByFields={Object.keys(AlbumOrderByField)}
										/>
									</Fragment>
								)}
								{isEmpty(songs) ? null : (
									<Fragment>
										<h2 className={bem("heading")}>Songs</h2>
										<Songs
											songs={songs}
											orderByKey="songsOrderBy"
											orderByFields={Object.keys(SongOrderByField)}
										/>
									</Fragment>
								)}
							</div>
						</Helmet>
					)
				}
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

interface Vars extends UserVar, Params {
	songsOrderBy: SongOrderBy,
	albumsOrderBy: AlbumOrderBy,
}

export default ArtistPage