import random from "lodash/random"
import isEmpty from "lodash/isEmpty"
import { createBem } from "@oly_op/bem"
import isUndefined from "lodash/isUndefined"
import { useParams } from "react-router-dom"
import { createElement, Fragment, FC } from "react"

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
	const { settings: { songsOrderBy, albumsOrderBy } } = useSettingsContext()
	const variables = { userId, songsOrderBy, albumsOrderBy, ...params }
	return (
		<QueryApi<Res, Vars>
			className={bem("")}
			variables={variables}
			query={GET_ARTIST_PAGE}
			children={
				res => {
					if (isUndefined(res)) return null
					const { name, photo, songs, albums } = res.artist
					return (
						<Helmet title={name}>
							<Img
								url={photo}
								imgClassName={bem("cover-img")}
								className={bem("cover", "Elevated")}
							>
								<div className={bem("cover-content", "Padding")}>
									<h1 className={bem("cover-content-name")}>
										<span className={bem("cover-content-name-text")}>{name}</span>
										<InLibraryButton
											doc={res.artist}
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

interface Res {
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