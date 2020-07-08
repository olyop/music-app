import isEmpty from "lodash/isEmpty"
import isUndefined from "lodash/isUndefined"
import { createElement, useState, FC } from "react"

import AddCover from "../AddCover"
import QueryApi from "../../QueryApi"

import GET_GENRE_SEARCH_EXACT from "../../../graphql/queries/genreSearchExact.gql"
import GET_ARTIST_SEARCH_EXACT from "../../../graphql/queries/artistSearchExact.gql"

const hideDoc = (data, isArtist) => (
	isUndefined(data) ||
	!isEmpty(data[isArtist ? "artistSearch" : "genreSearch"])
)

const AddDoc: FC<PropTypes> = ({
	doc,
	className,
	type = "artist",
}) => {
	const [ cover, setCover ] = useState(null)
	const isArtist = type === "artist"
	return (
		<QueryApi
			spinner={false}
			variables={{ query: doc }}
			query={isArtist ? GET_ARTIST_SEARCH_EXACT : GET_GENRE_SEARCH_EXACT}
			children={
				data => (
					hideDoc(data, isArtist) ? null : (
						<div key={doc} className={`${className} Elevated Card`}>
							{isArtist ? (
								<AddCover
									landscape
									name={doc}
									img={cover}
									handleChange={setCover}
								/>
							) : null}
							<p className="Text MarginQuart">
								{doc}
							</p>
						</div>
					)
				)
			}
		/>
	)
}

interface PropTypes {
	doc: string,
	type?: string,
	className?: string,
}

export default AddDoc