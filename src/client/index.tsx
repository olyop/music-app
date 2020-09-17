import { render } from "react-dom"
import { createElement, FC } from "react"
import { BrowserRouter as ReactRouter } from "react-router-dom"

import { ReactRedux } from "./redux"
import Pages from "./components/Pages"
import Header from "./components/Header"
import Loading from "./components/Loading"
import PlayerBar from "./components/PlayerBar"
import { Provider as ApolloClient } from "./apollo"

import "./index.scss"

const Application: FC = () => (
	<ReactRedux>
		<ReactRouter>
			<ApolloClient>
				<Loading/>
				<Header/>
				<Pages/>
				<PlayerBar/>
			</ApolloClient>
		</ReactRouter>
	</ReactRedux>
)

render(
	<Application/>,
	document.getElementById("Application"),
)