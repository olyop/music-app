import isEmpty from "lodash/isEmpty"
import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import List from "../List"
import Artist from "../Artist"
import OrderBy from "../OrderBy"
import { useStateListStyle } from "../../redux"
import { OrderBySettings, ListStyle, Artist as TArtist } from "../../types"

const bem = createBem("")

const Artists: FC<PropTypes> = ({
	artists,
	className,
	orderByKey,
	orderByFields,
	hideOrderBy = false,
}) => {
	const listStyle = useStateListStyle()
	const isList = listStyle === ListStyle.LIST
	const empty = isEmpty(artists)
	return (
		<div className={bem(className, isList && !empty && "Elevated")}>
			{hideOrderBy || (
				<OrderBy
					settingsKey={orderByKey!}
					fieldOptions={orderByFields!}
					className={bem(
						isList && !empty && "ItemBorder",
						isList ? "PaddingHalf FlexListRight" : "Content MarginBottomThreeQuart",
					)}
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
}

interface PropTypes {
	artists: TArtist[],
	className?: string,
	hideOrderBy?: boolean,
	orderByFields?: string[],
	orderByKey?: keyof Pick<OrderBySettings, "artists" | "userArtists">,
}

export default Artists