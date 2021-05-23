import { render } from "react-dom"
import { createElement } from "react"
import { BrowserRouter as ReactRouter } from "react-router-dom"

import Bar from "./components/Bar"
import { ReactRedux } from "./redux"
import Pages from "./components/Pages"
import Header from "./components/Header"
import Loading from "./components/Loading"
import Sidebar from "./components/Sidebar"
import { Provider as ApolloClient } from "./apollo"
import Authenticate from "./components/Authenticate"

render(
	<ReactRedux>
		<ReactRouter>
			<ApolloClient>
				<Loading/>
				<Authenticate>
					<Sidebar/>
					<Header/>
					<Pages/>
					<Bar/>
				</Authenticate>
			</ApolloClient>
		</ReactRouter>
	</ReactRedux>,
	document.getElementById("Application"),
)

if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker.register("/sw.js")
	})
}