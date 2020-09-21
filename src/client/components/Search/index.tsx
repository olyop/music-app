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
	UserVar,
	Song as TSong,
	Genre as TGenre,
	Album as TAlbum,
	Artist as TArtist,
} from "../../types"

import {
	addError,
	addLoading,
	useDispatch,
	removeLoading,
	useStateUserId,
} from "../../redux"

import Song from "../Song"
import Genre from "../Genre"
import Album from "../Album"
import Artist from "../Artist"
import { isSong, isGenre, isAlbum, isArtist } from "./isDoc"
import GET_SEARCH from "../../graphql/queries/search.gql"

import "./index.scss"

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

	const handleChange: ChangeEventHandler<HTMLInputElement> =
		({ target: { value } }) => {
			setInput(value)
			delayedQuery(value)
		}

	useEffect(() => {
		delayedQuery(initQuery)
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
		<div className={bem("")}>
			<div className={bem("bar", "Padding")}>
				<input
					autoFocus
					value={input}
					placeholder="Search..."
					onChange={handleChange}
					className={bem("bar-input")}
				/>
			</div>
			{!isEmpty(input) && data && (
				<div className={bem("content", "Content Elevated")}>
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
									album={doc}
									key={doc.albumId}
									className={docClassName}
								/>
							)
						} else if (isArtist(doc)) {
							return (
								<Artist
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
		</div>
	)
}

interface Params {
	query?: string,
}

interface Vars extends UserVar {
	query: string,
}

type DelayedQuery = (x: string) => void

export interface Data {
	search: (TSong | TGenre | TAlbum | TArtist)[],
}

export default Search