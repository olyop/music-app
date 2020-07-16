import { createElement, FC } from "react"
import { createBem, BemInput } from "@oly_op/bem"

import Song from "../Song"
import Select from "../Select"
import { useSettingsContext } from "../../contexts/Settings"

import {
	SongOrderBy,
	Song as SongType,
	SongOrderByField,
	OrderByDirection,
} from "../../types"

import "./index.scss"

const bem = createBem("Songs")

const Songs: FC<PropTypes> = ({ songs, className }) => {
	const { setSettings, settings: { songsOrderBy } } =
		useSettingsContext()
	const handleChange = <T,>(key: keyof SongOrderBy) => (val: string) =>
		setSettings(prevState => ({
			...prevState,
			songsOrderBy: {
				...prevState.songsOrderBy,
				[key]: (val as unknown) as T,
			},
		}))
	return (
		<div className={bem(className, "")}>
			<div className={bem("selects")}>
				<Select
					value={songsOrderBy.field}
					options={Object.keys(SongOrderByField)}
					className={bem("select", "MarginRightHalf")}
					onChange={handleChange<SongOrderByField>("field")}
				/>
				<Select
					className={bem("select")}
					value={songsOrderBy.direction}
					options={Object.keys(OrderByDirection)}
					onChange={handleChange<OrderByDirection>("direction")}
				/>
			</div>
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
}

interface PropTypes {
	songs: SongType[],
	className?: BemInput,
}

export default Songs