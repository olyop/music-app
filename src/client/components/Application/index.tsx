import { createElement, FC, useState, useEffect } from "react"

import Pages from "../Pages"
import Header from "../Header"
import PlayerBar from "../PlayerBar"
import { ListStyleEnum } from "../../types"
import { useLocalStorage } from "../../helpers"
import { PlayProvider } from "../../contexts/Play"
import { CurrentProvider } from "../../contexts/Current"
import { SidebarProvider } from "../../contexts/Sidebar"
import { ListStyleProvider } from "../../contexts/ListStyle"
import { ShowGenresProvider } from "../../contexts/ShowGenres"

import "./index.scss"

const Application: FC = () => {
	const [ play, setPlay ] = useState(false)
	const [ current, setCurrent ] = useState(0)
	const [ sidebar, setSidebar ] = useLocalStorage("sidebar", false)
	const [ showGenres, setShowGenres ] = useLocalStorage("showGenres", false)
	const [ listStyle, setListStyle ] = useLocalStorage("listStyle", ListStyleEnum.grid)

	const togglePlay = (val?: boolean) => setPlay(prevState => val || !prevState)
	const toggleSidebar = () => setSidebar(prevState => !prevState)

	useEffect(() => {
		document.documentElement.style.setProperty(
			"--content-width",
			sidebar ? "calc(100vw - var(--sidebar-width))" : "100vw",
			"important",
		)
	}, [sidebar])

	return (
		<CurrentProvider value={{ current, setCurrent }}>
			<PlayProvider value={{ play, setPlay, togglePlay }}>
				<SidebarProvider value={{ sidebar, toggleSidebar }}>
					<ListStyleProvider value={{ listStyle, setListStyle }}>
						<ShowGenresProvider value={{ showGenres, setShowGenres }}>
							<Header/>
							<Pages/>
							<PlayerBar/>
						</ShowGenresProvider>
					</ListStyleProvider>
				</SidebarProvider>
			</PlayProvider>
		</CurrentProvider>
	)
}

export default Application