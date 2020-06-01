import { createElement, FC, useState, useEffect } from "react"

import Pages from "../Pages"
import Header from "../Header"
import PlayerBar from "../PlayerBar"
import { ListStyleEnum } from "../../types"
import { useLocalStorage } from "../../helpers"
import { PlayProvider } from "../../contexts/Play"
import { SidebarProvider } from "../../contexts/Sidebar"
import { ListStyleProvider } from "../../contexts/ListStyle"

import "./index.scss"

const Application: FC = () => {
	const [ play, setPlay ] = useState(false)
	const [ sidebar, setSidebar ] = useLocalStorage("sidebar", false)
	const [ listStyle, setListStyle ] = useLocalStorage("listStyle", ListStyleEnum.grid)

	const togglePlay = () => setPlay(prevState => !prevState)
	const toggleSidebar = () => setSidebar(prevState => !prevState)

	useEffect(() => {
		document.documentElement.style.setProperty(
			"--content-width",
			sidebar ? "100vw" : "calc(100vw - var(--sidebar-width))",
			"important",
		)
	}, [sidebar])

	return (
		<PlayProvider value={{ play, togglePlay }}>
			<SidebarProvider value={{ sidebar, toggleSidebar }}>
				<ListStyleProvider value={{ listStyle, setListStyle }}>
					<Header/>
					<Pages/>
					<PlayerBar/>
				</ListStyleProvider>
			</SidebarProvider>
		</PlayProvider>
	)
}

export default Application