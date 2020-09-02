import { createElement, FC } from "react"

import Song from "../Song"
import OrderBy from "../OrderBy"
import { Settings, Song as SongType } from "../../types"

const Songs: FC<PropTypes> = ({
	songs,
	className,
	orderByKey,
	orderByFields,
	hideOrderBy = false,
}) => (
	<div className={className}>
		{hideOrderBy || (
			<OrderBy
				className="MarginBottom"
				settingsKey={orderByKey!}
				fieldOptions={orderByFields!}
			/>
		)}
		<div className="Elevated">
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
	</div>
)

interface PropTypes {
	songs: SongType[],
	className?: string,
	hideOrderBy?: boolean,
	orderByFields?: string[],
	orderByKey?: keyof Pick<Settings, "songsOrderBy" | "userSongsOrderBy">,
}

export default Songs