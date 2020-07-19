import { createElement, FC } from "react"

import List from "../List"
import Artist from "../Artist"
import OrderBy from "../OrderBy"
import { Settings, Artist as ArtistType } from "../../types"

const Artists: FC<PropTypes> = ({ artists, orderByKey, orderByFields, className }) => (
	<div className={className}>
		<OrderBy
			className="MarginBottom"
			settingsKey={orderByKey}
			fieldOptions={orderByFields}
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
	orderByFields: string[],
	orderByKey: keyof Pick<Settings, "artistsOrderBy" | "userArtistsOrderBy">,
}

export default Artists