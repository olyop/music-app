import { createElement, FC, useState, useEffect } from "react"

import Pages from "../Pages"
import Header from "../Header"
import PlayerBar from "../PlayerBar"
import { useLocalStorage } from "../../helpers"
import { PlayProvider } from "../../contexts/Play"
import { CurrentProvider } from "../../contexts/Current"
import { SettingsProvider } from "../../contexts/Settings"

import {
	Settings,
	ListStyleEnum,
	OrderByDirection,
	SongOrderByField,
} from "../../types"

import "./index.scss"

const defaultSettings: Settings = {
	sidebar: false,
	showGenres: false,
	listStyle: ListStyleEnum.grid,
	songsOrderBy: {
		field: SongOrderByField.TITLE,
		direction: OrderByDirection.ASC,
	},
}

const Application: FC = () => {
	const [ play, setPlay ] = useState(false)
	const [ current, setCurrent ] = useState(0)
	const [ settings, setSettings ] = useLocalStorage("settings", defaultSettings)

	useEffect(() => {
		document.documentElement.style.setProperty(
			"--content-width",
			settings.sidebar ? "calc(100vw - var(--sidebar-width))" : "100vw",
			"important",
		)
	}, [settings.sidebar])

	return (
		<PlayProvider value={{ play, setPlay }}>
			<CurrentProvider value={{ current, setCurrent }}>
				<SettingsProvider value={{ settings, setSettings }}>
					<Header/>
					<Pages/>
					<PlayerBar/>
				</SettingsProvider>
			</CurrentProvider>
		</PlayProvider>
	)
}

export default Application