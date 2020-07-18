import { createElement, FC } from "react"

import {
	OrderByIgnore,
	SongOrderByField,
	Song as SongType,
} from "../../types"

import Song from "../Song"
import OrderBy from "../OrderBy"
import { enumToString } from "../../helpers"

const Songs: FC<PropTypes> = ({ songs, orderByIgnore, className }) => (
	<div className={className}>
		<OrderBy
			className="MarginBottom"
			settingsKey="songsOrderBy"
			fieldOptions={enumToString(SongOrderByField, orderByIgnore)}
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
	orderByIgnore?: OrderByIgnore,
}

export default Songs