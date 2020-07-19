import { createElement, FC } from "react"

import List from "../List"
import Album from "../Album"
import OrderBy from "../OrderBy"
import { Settings, Album as AlbumType } from "../../types"

const Albums: FC<PropTypes> = ({ albums, orderByKey, orderByFields, className }) => (
	<div className={className}>
		<OrderBy
			className="MarginBottom"
			settingsKey={orderByKey}
			fieldOptions={orderByFields}
		/>
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
	orderByFields: string[],
	orderByKey: keyof Pick<Settings, "albumsOrderBy" | "userAlbumsOrderBy">,
}

export default Albums