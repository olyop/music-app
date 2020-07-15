import { DocumentNode } from "graphql"
import { createBem, BemInput } from "@oly_op/bem"
import { createElement, FC, Fragment } from "react"

import Song from "../Song"
import Select from "../Select"
import QueryApi from "../QueryApi"
import { useSettingsContext } from "../../contexts/Settings"

import {
	SongOrderBy,
	Song as SongType,
	SongOrderByField,
	OrderByDirection,
} from "../../types"

import "./index.scss"

const bem = createBem("Songs")

const Songs: FC<PropTypes> = ({ query, className }) => {
	const { setSettings, settings: { songsOrderBy } } =
		useSettingsContext()
	const varaibles =
		{ orderBy: songsOrderBy }
	const handleChange = <T,>(key: keyof SongOrderBy) => (val: string) =>
		setSettings(prevState => ({
			...prevState,
			songsOrderBy: {
				...prevState.songsOrderBy,
				[key]: (val as unknown) as T,
			},
		}))
	return (
		<QueryApi
			query={query}
			variables={varaibles}
			className={bem(className, "")}
			children={
				(res: Res) => (
					<Fragment>
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
							{res.songs.map(
								song => (
									<Song
										song={song}
										key={song.songId}
										className="PaddingHalf Hover ItemBorder"
									/>
								),
							)}
						</div>
					</Fragment>
				)
			}
		/>
	)
}

interface Res {
	songs: SongType[],
}

interface PropTypes {
	query: DocumentNode,
	className?: BemInput,
}

export default Songs