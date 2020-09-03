import { createElement, FC } from "react"
import { createBem, BemInput } from "@oly_op/bem"

import Song from "../Song"
import OrderBy from "../OrderBy"
import { Settings, Song as SongType } from "../../types"

const bem = createBem("Songs")

const Songs: FC<PropTypes> = ({
	songs,
	className,
	orderByKey,
	orderByFields,
	hideOrderBy = false,
}) => (
	<div className={bem(className, songs.length === 0 ? null : "Elevated")}>
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

interface PropTypes {
	songs: SongType[],
	className?: BemInput,
	hideOrderBy?: boolean,
	orderByFields?: string[],
	orderByKey?: keyof Pick<Settings, "songsOrderBy" | "userSongsOrderBy">,
}

export default Songs