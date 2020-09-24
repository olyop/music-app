import { render } from "react-dom"
import { createElement } from "react"
import { BrowserRouter as ReactRouter } from "react-router-dom"

import { ReactRedux } from "./redux"
import Pages from "./components/Pages"
import Header from "./components/Header"
import Loading from "./components/Loading"
import ApiError from "./components/ApiError"
import PlayerBar from "./components/PlayerBar"
import { Provider as ApolloClient } from "./apollo"

render(
	<ReactRedux>
		<ReactRouter>
			<ApolloClient>
				<ApiError/>
				<Loading/>
				<Header/>
				<Pages/>
				<PlayerBar/>
			</ApolloClient>
		</ReactRouter>
	</ReactRedux>,
	document.getElementById("Application"),
)