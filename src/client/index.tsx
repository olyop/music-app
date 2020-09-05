import { render } from "react-dom"
import { createElement, FC } from "react"
import { BrowserRouter as ReactRouter } from "react-router-dom"

import { ReactRedux } from "./redux"
import Pages from "./components/Pages"
import Header from "./components/Header"
import PlayerBar from "./components/PlayerBar"
import { Provider as ApolloClient } from "./apollo"

import "./index.scss"

const Index: FC = () => (
	<ReactRedux>
		<ReactRouter>
			<ApolloClient>
				<Header/>
				<Pages/>
				<PlayerBar/>
			</ApolloClient>
		</ReactRouter>
	</ReactRedux>
)

render(
	<Index/>,
	document.getElementById("Application"),
)