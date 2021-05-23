import isEmpty from "lodash/isEmpty"
import { createElement, FC } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"

import Song from "../Song"
import OrderBy from "../OrderBy"
import { OrderBySettings, Song as SongType } from "../../types"

const bem = createBem("Songs")

const Songs: FC<PropTypes> = ({
	className,
	orderByKey,
	songs = [],
	orderByFields,
	hidePlays = false,
	hideIndex = false,
	hideCover = false,
	hideOrderBy = false,
	hideDuration = false,
	hideElevated = false,
	hideInLibrary = false,
	hideTrackNumber = false,
}) => (
	<div
		className={bem(
			className,
			(isEmpty(songs) || hideElevated) || "Elevated",
		)}
	>
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
					hidePlays={hidePlays}
					hideCover={hideCover}
					hideDuration={hideDuration}
					hideInLibrary={hideInLibrary}
					hideTrackNumber={hideTrackNumber}
					key={song.songId + index.toString()}
					className="Hover ItemBorder PaddingHalf"
					index={hideIndex ? undefined : index + 1}
				/>
			),
		)}
	</div>
)

interface PropTypes extends BemPropTypes {
	songs?: SongType[],
	hideCover?: boolean,
	hidePlays?: boolean,
	hideIndex?: boolean,
	hideOrderBy?: boolean,
	hideDuration?: boolean,
	hideElevated?: boolean,
	hideInLibrary?: boolean,
	orderByFields?: string[],
	hideTrackNumber?: boolean,
	orderByKey?: keyof Pick<OrderBySettings, "songs" | "userSongs">,
}

export default Songs