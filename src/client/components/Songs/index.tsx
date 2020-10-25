import isEmpty from "lodash/isEmpty"
import { createElement, FC } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"

import Song from "../Song"
import OrderBy from "../OrderBy"
import { OrderBySettings, Song as SongType } from "../../types"

const bem = createBem("Songs")

const Songs: FC<PropTypes> = ({
	songs,
	className,
	orderByKey,
	orderByFields,
	showCover = true,
	hideOrderBy = false,
	showTrackNumber = false,
	includeIndexInKey = false,
}) => (
	<div className={bem(className, isEmpty(songs) || "Elevated")}>
		{hideOrderBy || (
			<OrderBy
				settingsKey={orderByKey!}
				fieldOptions={orderByFields!}
				className="PaddingHalf ItemBorder FlexListRight"
			/>
		)}
		{songs.map(
			(song, index) => (
				<Song
					song={song}
					showCover={showCover}
					showTrackNumber={showTrackNumber}
					className="Hover ItemBorder PaddingHalf"
					key={includeIndexInKey ? `${song.songId}${index}` : song.songId}
				/>
			),
		)}
	</div>
)

interface PropTypes extends BemPropTypes {
	songs: SongType[],
	showCover?: boolean,
	hideOrderBy?: boolean,
	orderByFields?: string[],
	showTrackNumber?: boolean,
	includeIndexInKey?: boolean,
	orderByKey?: keyof Pick<OrderBySettings, "songs" | "userSongs">,
}

export default Songs