import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import Song from "../Song"
import { Disc } from "../../types"

import "./index.scss"

const bem = createBem("Disc")

const Disc: FC<PropTypes> = ({ disc: { songs, number } }) => (
	<div className={bem("")}>
		<h4
			children={`Disc ${number}`}
			className={bem("number")}
		/>
		<div className="Elevated">
			{songs.map(
				song => (
					<Song
						song={song}
						showTrackNumber
						key={song.songId}
						showCover={false}
						className="PaddingHalf Hover ItemBorder"
					/>
				),
			)}
		</div>
	</div>
)

interface PropTypes {
	disc: Disc,
}

export default Disc