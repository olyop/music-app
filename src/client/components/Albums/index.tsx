import { createElement, FC } from "react"

import List from "../List"
import Album from "../Album"
import OrderBy from "../OrderBy"
import { useStateListStyle } from "../../redux"
import { OrderBySettings, Album as AlbumType, ListStyle } from "../../types"

const Albums: FC<PropTypes> = ({
	albums,
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
		<List className={useStateListStyle() === ListStyle.LIST && "Content"}>
			{albums.map(
				album => (
					<Album
						album={album}
						key={album.albumId}
					/>
				),
			)}
		</List>
	</div>
)

interface PropTypes {
	className?: string,
	albums: AlbumType[],
	hideOrderBy?: boolean,
	orderByFields?: string[],
	orderByKey?: keyof Pick<OrderBySettings, "albums" | "userAlbums">,
}

export default Albums