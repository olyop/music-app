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
	hideOrderBy = false,
}) => (
	<div className={bem(className, isEmpty(songs) ? null : "Elevated Content")}>
		{hideOrderBy || (
			<OrderBy
				settingsKey={orderByKey!}
				fieldOptions={orderByFields!}
				className="PaddingHalf ItemBorder"
			/>
		)}
		{songs.map(
			song => (
				<Song
					song={song}
					key={song.songId}
					className="PaddingHalf Hover ItemBorder"
				/>
			),
		)}
	</div>
)

interface PropTypes extends BemPropTypes {
	songs: SongType[],
	hideOrderBy?: boolean,
	orderByFields?: string[],
	orderByKey?: keyof Pick<OrderBySettings, "songs" | "userSongs">,
}

export default Songs