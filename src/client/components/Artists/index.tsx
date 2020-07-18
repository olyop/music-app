import { createElement, FC } from "react"

import {
	OrderByIgnore,
	ArtistOrderByField,
	Artist as ArtistType,
} from "../../types"

import List from "../List"
import Artist from "../Artist"
import OrderBy from "../OrderBy"
import { enumToString } from "../../helpers"

const Artists: FC<PropTypes> = ({ artists, className, orderByIgnore }) => (
	<div className={className}>
		<OrderBy
			className="MarginBottom"
			settingsKey="artistsOrderBy"
			fieldOptions={enumToString(ArtistOrderByField, orderByIgnore)}
		/>
		<List>
			{artists.map(
				artist => (
					<Artist
						artist={artist}
						key={artist.artistId}
					/>
				),
			)}
		</List>
	</div>
)

interface PropTypes {
	className?: string,
	artists: ArtistType[],
	orderByIgnore?: OrderByIgnore,
}

export default Artists