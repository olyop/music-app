import {
	FC,
	Fragment,
	useState,
	createElement,
	ChangeEventHandler,
} from "react"

import isEmpty from "lodash/isEmpty"
import { createBem } from "@oly_op/bem"

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
import QueryApi from "../QueryApi"
import { useUserContext } from "../../contexts/User"
import GET_SEARCH from "../../graphql/queries/search.gql"

import "./index.scss"

const bem = createBem("Search")

const Search: FC = () => {
	const [ query, setQuery ] =
		useState("")
	const userId =
		useUserContext()
	const handleChange: ChangeEventHandler<HTMLInputElement> = event =>
		setQuery(event.target.value)
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
			{isEmpty(query) ? null : (
				<QueryApi<Data, Vars>
					query={GET_SEARCH}
					className={bem("content", "Padding")}
					variables={{ userId, query }}
					children={
						({ data }) => data && (
							<Fragment>
								<Songs
									hideOrderBy
									songs={data.songSearch}
									className="MarginBottom"
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
							</Fragment>
						)
					}
				/>
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