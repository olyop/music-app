import {
	FC,
	useRef,
	useState,
	useEffect,
	createElement,
	ChangeEventHandler,
} from "react"

import isEmpty from "lodash/isEmpty"
import debounce from "lodash/debounce"
import uniqueId from "lodash/uniqueId"
import { createBem } from "@oly_op/bem"
import { useLazyQuery } from "@apollo/client"
import { useHistory, useLocation } from "react-router-dom"

import {
	addError,
	addLoading,
	useDispatch,
	removeLoading,
	useStateUserId,
} from "../../redux"

import {
	UserVar,
	Song as TSong,
	Genre as TGenre,
	Album as TAlbum,
	Artist as TArtist,
} from "../../types"

import Icon from "../Icon"
import Song from "../Song"
import Genre from "../Genre"
import Album from "../Album"
import Artist from "../Artist"
import GET_SEARCH from "./getSearch.gql"
import { isSong, isGenre, isAlbum, isArtist } from "./isDoc"

import "./index.scss"
import Helmet from "../Helmet"

const bem = createBem("Search")

const Search: FC = () => {
	const history = useHistory()
	const location = useLocation()
	const dispatch = useDispatch()
	const userId = useStateUserId()
	const queryId = useRef(uniqueId())

	const params = new URLSearchParams(location.search)
	const initQuery = params.get("query") ?? ""
	const [ input, setInput ] = useState(initQuery)

	const [ search, { data, error, loading } ] =
		useLazyQuery<Data, Vars>(GET_SEARCH)

	const delayedQuery =
		useRef(debounce<DelayedQuery>(query => search({ variables: {
			query,
			userId,
		} }), 500)).current

	const handleChange =
		(value: string) => {
			setInput(value)
			delayedQuery(value)
		}

	const handleClear =
		() => handleChange("")

	const handleInput: ChangeEventHandler<HTMLInputElement> =
		({ target: { value } }) => handleChange(value)

	useEffect(() => {
		if (!isEmpty(initQuery)) {
			delayedQuery(initQuery)
		}
	}, [delayedQuery, initQuery])

	useEffect(() => {
		const newParams = new URLSearchParams({ query: input })
		history.push({ search: newParams.toString() })
	}, [input, history])

	useEffect(() => {
		if (loading) {
			dispatch(addLoading(queryId.current))
		} else {
			dispatch(removeLoading(queryId.current))
		}
	}, [loading, queryId, dispatch])

	useEffect(() => {
		if (error) {
			dispatch(addError(error))
		}
	})

	const docClassName = "PaddingHalf Hover ItemBorder"

	return (
		<Helmet title="Search">
			<section className={bem("")}>
				<div className={bem("bar", "Content")}>
					<input
						autoFocus
						value={input}
						onChange={handleInput}
						placeholder="Search..."
						className={bem("bar-input")}
					/>
					<Icon
						icon="close"
						onClick={handleClear}
						className={bem("bar-input-close")}
					/>
				</div>
				{!isEmpty(input) && data && (
					<div className="Content Elevated">
						{data.search.map(doc => {
							if (isSong(doc)) {
								return (
									<Song
										song={doc}
										key={doc.songId}
										className={docClassName}
									/>
								)
							} else if (isGenre(doc)) {
								return (
									<Genre
										genre={doc}
										key={doc.genreId}
										className={docClassName}
									/>
								)
							} else if (isAlbum(doc)) {
								return (
									<Album
										alwaysList
										album={doc}
										key={doc.albumId}
										className={docClassName}
									/>
								)
							} else if (isArtist(doc)) {
								return (
									<Artist
										alwaysList
										artist={doc}
										key={doc.artistId}
										className={docClassName}
									/>
								)
							} else {
								return null
							}
						})}
					</div>
				)}
				<img
					alt="algolia"
					className={bem("logo", "MarginTop MarginBottom")}
					src="https://music-app.s3-ap-southeast-2.amazonaws.com/logos/algolia.png"
				/>
			</section>
		</Helmet>
	)
}

interface Vars extends UserVar {
	query: string,
}

type DelayedQuery = (x: string) => void

export interface Data {
	search: (TSong | TGenre | TAlbum | TArtist)[],
}

export default Search