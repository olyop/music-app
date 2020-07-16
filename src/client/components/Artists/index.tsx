import { createElement, FC } from "react"

import List from "../List"
import Artist from "../Artist"
import OrderBy from "../OrderBy"
import { ArtistOrderByField, Artist as ArtistType } from "../../types"

const Artists: FC<PropTypes> = ({ artists, className }) => (
	<div className={className}>
		<OrderBy
			className="MarginBottom"
			settingsKey="artistsOrderBy"
			fieldOptions={Object.keys(ArtistOrderByField)}
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
}

export default Artists