import { createElement, FC } from "react"

import Song from "../Song"
import OrderBy from "../OrderBy"
import { SongOrderByField, Song as SongType } from "../../types"

const Songs: FC<PropTypes> = ({ songs, className }) => ( 
	<div className={className}>
		<OrderBy
			className="MarginBottom"
			settingsKey="songsOrderBy"
			fieldOptions={Object.keys(SongOrderByField)}
		/>
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
}

export default Songs