import { createElement, FC } from "react"

import List from "../List"
import Artist from "../Artist"
import OrderBy from "../OrderBy"
import { Settings, Artist as ArtistType } from "../../types"

const Artists: FC<PropTypes> = ({
	artists,
	className,
	orderByKey,
	orderByFields,
	hideOrderBy = false,
}) => (
	<div className={className}>
		{hideOrderBy || (
			<OrderBy
				className="MarginBottom"
				settingsKey={orderByKey!}
				fieldOptions={orderByFields!}
			/>
		)}
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
	hideOrderBy?: boolean,
	orderByFields?: string[],
	orderByKey?: keyof Pick<Settings, "artistsOrderBy" | "userArtistsOrderBy">,
}

export default Artists