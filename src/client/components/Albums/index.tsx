import { createElement, FC } from "react"

import List from "../List"
import Album from "../Album"
import OrderBy from "../OrderBy"
import { OrderBySettings, Album as AlbumType } from "../../types"

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
				settingsKey={orderByKey!}
				className="MarginBottomHalf"
				fieldOptions={orderByFields!}
			/>
		)}
		<List>
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