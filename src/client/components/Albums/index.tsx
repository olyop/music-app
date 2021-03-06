import isEmpty from "lodash/isEmpty"
import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import List from "../List"
import Album from "../Album"
import OrderBy from "../OrderBy"
import { useStateListStyle } from "../../redux"
import { ListStyle, Album as TAlbum } from "../../types"

const bem = createBem("")

const Albums: FC<PropTypes> = ({
	className,
	albums = [],
	orderByFields,
	hideOrderBy = false,
}) => {
	const listStyle = useStateListStyle()
	const isList = listStyle === ListStyle.LIST
	const empty = isEmpty(albums)
	return (
		<div
			className={bem(
				className,
				isList && !empty && "Elevated",
				isList && "Content",
			)}
		>
			{hideOrderBy || (
				<OrderBy
					settingsKey="albums"
					fieldOptions={orderByFields!}
					className={bem(
						isList && !empty && "ItemBorder",
						isList ?
							"PaddingHalf FlexListRight" :
							"Content MarginBottomThreeQuart",
					)}
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
}

interface PropTypes {
	albums?: TAlbum[],
	className?: string,
	hideOrderBy?: boolean,
	orderByFields?: string[],
}

export default Albums