import {
	FC,
	useRef,
	useState,
	createElement,
	ChangeEventHandler,
} from "react"

import isEmpty from "lodash/isEmpty"
import debounce from "lodash/debounce"
import { createBem } from "@oly_op/bem"
import { useLazyQuery } from "@apollo/client"

import {
	Song,
	Genre,
	Album,
	Artist,
	UserVar,
} from "../../types"

import Songs from "../Songs"
import Genres from "../Genres"
import Albums from "../Albums"
import Artists from "../Artists"
import { useUserContext } from "../../contexts"
import GET_SEARCH from "../../graphql/queries/search.gql"

import "./index.scss"

const bem = createBem("Search")

type HandleChange = ChangeEventHandler<HTMLInputElement>

const Search: FC = () => {
	const userId = useUserContext()
	const [ query, setQuery ] = useState("")
	const variables: Vars = { query, userId }
	const [search, { data }] = useLazyQuery<Data, Vars>(GET_SEARCH, { variables })
	const delayedQuery = useRef(debounce(x => search(x), 500)).current
	const handleChange: HandleChange = ({ target }) => {
		const { value } = target
		setQuery(value)
		delayedQuery(value)
	}
	return (
		<div className={bem("")}>
			<div className={bem("bar", "Padding")}>
				<input
					autoFocus
					value={query}
					placeholder="Search..."
					onChange={handleChange}
					className={bem("bar-input")}
				/>
			</div>
			{isEmpty(query) ? null : data && (
				<div className={bem("content", "Padding")}>
					<Songs
						hideOrderBy
						className="MarginBottom"
						songs={data.songSearch}
					/>
					<Genres
						className="MarginBottom"
						genres={data.genreSearch}
					/>
					<Albums
						hideOrderBy
						className="MarginBottom"
						albums={data.albumSearch}
					/>
					<Artists
						hideOrderBy
						className="MarginBottom"
						artists={data.artistSearch}
					/>
				</div>
			)}
		</div>
	)
}

interface Vars extends UserVar {
	query: string,
}

interface Data {
	songSearch: Song[],
	genreSearch: Genre[],
	albumSearch: Album[],
	artistSearch: Artist[],
}

export default Search