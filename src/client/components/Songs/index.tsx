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
	showRight = true,
	showIndex = false,
	hideCover = false,
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
					showRight={showRight}
					hideCover={hideCover}
					showTrackNumber={showTrackNumber}
					className="Hover ItemBorder PaddingHalf"
					index={showIndex ? index + 1 : undefined}
					key={includeIndexInKey ? `${song.songId}${index}` : song.songId}
				/>
			),
		)}
	</div>
)

interface PropTypes extends BemPropTypes {
	songs: SongType[],
	showRight?: boolean,
	hideCover?: boolean,
	showIndex?: boolean,
	hideOrderBy?: boolean,
	orderByFields?: string[],
	showTrackNumber?: boolean,
	includeIndexInKey?: boolean,
	orderByKey?: keyof Pick<OrderBySettings, "songs" | "userSongs">,
}

export default Songs