import { createElement, FC } from "react"

import {
	OrderByIgnore,
	AlbumOrderByField,
	Album as AlbumType,
} from "../../types"

import List from "../List"
import Album from "../Album"
import OrderBy from "../OrderBy"
import { enumToString } from "../../helpers"

const Albums: FC<PropTypes> = ({ albums, className, orderByIgnore = [] }) => (
	<div className={className}>
		<OrderBy
			className="MarginBottom"
			settingsKey="albumsOrderBy"
			fieldOptions={enumToString(AlbumOrderByField, orderByIgnore)}
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
	orderByIgnore?: OrderByIgnore,
}

export default Albums