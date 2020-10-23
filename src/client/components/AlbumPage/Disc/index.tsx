import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import Song from "../../Song"
import { Disc as TDisc } from "../../../types"

import "./index.scss"

const bem = createBem("Disc")

const Disc: FC<PropTypes> = ({ disc: { songs, number, hideLabel } }) => (
	<div className={bem("")}>
		{hideLabel || (
			<h4
				className={bem("number")}
				children={`Disc ${number}`}
			/>
		)}
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
	disc: TDisc,
}

export default Disc