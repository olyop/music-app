import {
	FC,
	useState,
	useEffect,
	createElement,
} from "react"

import {
	PlayProvider,
	VolumeProvider,
	CurrentProvider,
	LoadingProvider,
	SidebarProvider,
	SettingsProvider,
	ShowVolumeProvider,
} from "../../contexts"

import Pages from "../Pages"
import Header from "../Header"
import PlayerBar from "../PlayerBar"
import defaultSettings from "./defaultSettings"
import { useLocalStorage } from "../../helpers"

import "./index.scss"

const Application: FC = () => {
	const [ play, setPlay ] = useState(false)
	const [ volume, setVolume ] = useState(0)
	const [ current, setCurrent ] = useState(0)
	const [ sidebar, setSidebar ] = useState(false)
	const [ loading, setLoading ] = useState(false)
	const [ showVolume, setShowVolume ] = useState(false)
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
			<VolumeProvider value={{ volume, setVolume }}>
				<SidebarProvider value={{ sidebar, setSidebar }}>
					<LoadingProvider value={{ loading, setLoading }}>
						<CurrentProvider value={{ current, setCurrent }}>
							<SettingsProvider value={{ settings, setSettings }}>
								<ShowVolumeProvider value={{ showVolume, setShowVolume }}>
									<Header/>
									<Pages/>
									<PlayerBar/>
								</ShowVolumeProvider>
							</SettingsProvider>
						</CurrentProvider>
					</LoadingProvider>
				</SidebarProvider>
			</VolumeProvider>
		</PlayProvider>
	)
}

export default Application