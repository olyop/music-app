import { createElement, FC, useState, useEffect } from "react"

import Pages from "../Pages"
import Header from "../Header"
import PlayerBar from "../PlayerBar"
import { useLocalStorage } from "../../helpers"
import { PlayProvider } from "../../contexts/Play"
import { LoadingProvider } from "../../contexts/Loading"
import { CurrentProvider } from "../../contexts/Current"
import { SettingsProvider } from "../../contexts/Settings"

import {
	Settings,
	ListStyle,
	OrderByDirection,
	SongOrderByField,
	GenreOrderByField,
} from "../../types"

import "./index.scss"

const defaultSettings: Settings = {
	sidebar: false,
	showGenres: false,
	listStyle: ListStyle.GRID,
	songsOrderBy: {
		field: SongOrderByField.TITLE,
		direction: OrderByDirection.ASC,
	},
	genresOrderBy: {
		field: GenreOrderByField.NAME,
		direction: OrderByDirection.ASC,
	},
}

const Application: FC = () => {
	const [ play, setPlay ] = useState(false)
	const [ current, setCurrent ] = useState(100)
	const [ loading, setLoading ] = useState(false)
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
			<LoadingProvider value={{ loading, setLoading }}>
				<CurrentProvider value={{ current, setCurrent }}>
					<SettingsProvider value={{ settings, setSettings }}>
						<Header/>
						<Pages/>
						<PlayerBar/>
					</SettingsProvider>
				</CurrentProvider>
			</LoadingProvider>
		</PlayProvider>
	)
}

export default Application