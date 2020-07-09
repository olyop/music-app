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

import "./index.scss"

const Application: FC = () => {
	const [ play, setPlay ] = useState(false)
	const [ current, setCurrent ] = useState(0)
	const [ sidebar, setSidebar ] = useLocalStorage("sidebar", false)
	const [ listStyle, setListStyle ] = useLocalStorage("listStyle", ListStyleEnum.grid)

	const togglePlay = () => setPlay(prevState => !prevState)
	const toggleSidebar = () => setSidebar(prevState => !prevState)

	useEffect(() => {
		document.documentElement.style.setProperty(
			"--content-width",
			sidebar ? "calc(100vw - var(--sidebar-width))" : "100vw",
			"important",
		)
	}, [sidebar])

	return (
		<PlayProvider value={{ play, togglePlay }}>
			<CurrentProvider value={{ current, setCurrent }}>
				<SidebarProvider value={{ sidebar, toggleSidebar }}>
					<ListStyleProvider value={{ listStyle, setListStyle }}>
						<Header/>
						<Pages/>
						<PlayerBar/>
					</ListStyleProvider>
				</SidebarProvider>
			</CurrentProvider>
		</PlayProvider>
	)
}

export default Application