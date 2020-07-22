import { createElement, FC, useState, useEffect } from "react"

import Pages from "../Pages"
import Header from "../Header"
import PlayerBar from "../PlayerBar"
import defaultSettings from "./defaultSettings"
import { useLocalStorage } from "../../helpers"
import { PlayProvider } from "../../contexts/Play"
import { LoadingProvider } from "../../contexts/Loading"
import { CurrentProvider } from "../../contexts/Current"
import { SidebarProvider } from "../../contexts/Sidebar"
import { SettingsProvider } from "../../contexts/Settings"

import "./index.scss"

const Application: FC = () => {
	const [ play, setPlay ] = useState(false)
	const [ current, setCurrent ] = useState(0)
	const [ sidebar, setSidebar ] = useState(false)
	const [ loading, setLoading ] = useState(false)
	const [ settings, setSettings ] = useLocalStorage("settings", defaultSettings)

	useEffect(() => {
		document.documentElement.style.setProperty(
			"--content-width",
			sidebar ? "calc(100vw - var(--sidebar-width))" : "100vw",
			"important",
		)
	}, [sidebar])

	return (
		<PlayProvider value={{ play, setPlay }}>
			<SidebarProvider value={{ sidebar, setSidebar }}>
				<LoadingProvider value={{ loading, setLoading }}>
					<CurrentProvider value={{ current, setCurrent }}>
						<SettingsProvider value={{ settings, setSettings }}>
							<Header/>
							<Pages/>
							<PlayerBar/>
						</SettingsProvider>
					</CurrentProvider>
				</LoadingProvider>
			</SidebarProvider>
		</PlayProvider>
	)
}

export default Application