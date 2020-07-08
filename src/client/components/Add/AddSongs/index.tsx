import sumBy from "lodash/sumBy"
import { createBem } from "@oly_op/bem"
import { createElement, FC, Dispatch, SetStateAction } from "react"

import AddSong from "../AddSong"
import { Song } from "../../../types"
import { deserializeDuration } from "../../../helpers"

import "./index.scss"

const bem = createBem("AddSongs")

const AddSongs: FC<PropTypes> = ({ songs, handleChange }) => {
	const onChange = ({ songId }: Song) => (value: Song) =>
		handleChange(val => val.map(
			song => (song.songId === songId ? value : song),
		))
	return (
		<div>
			<div className="Elevated MarginBottomThreeQuart">
				{songs.map(
					song => (
						<AddSong
							song={song}
							key={song.songId}
							className="ItemBorder"
							handleChange={onChange(song)}
						/>
					),
				)}
			</div>
			<p className={bem("total", "Text")}>
				{deserializeDuration(sumBy("duration"))}
			</p>
		</div>
	)
}

interface PropTypes {
	songs: Song[],
	handleChange: Dispatch<SetStateAction<Song[]>>,
}

export default AddSongs