import { render } from "react-dom"
import { createElement } from "react"
import { BrowserRouter as ReactRouter } from "react-router-dom"

import Bar from "./components/Bar"
import { ReactRedux } from "./redux"
import Modal from "./components/Modal"
import Pages from "./components/Pages"
import Header from "./components/Header"
import Loading from "./components/Loading"
import Sidebar from "./components/Sidebar"
import ApiError from "./components/ApiError"
import { Provider as ApolloClient } from "./apollo"
import Authenticate from "./components/Authenticate"

render(
	<ReactRedux>
		<ReactRouter>
			<ApolloClient>
				<ApiError/>
				<Loading/>
				<Header/>
				<Authenticate>
					<Pages/>
					<Bar/>
					<Modal/>
					<Sidebar/>
				</Authenticate>
			</ApolloClient>
		</ReactRouter>
	</ReactRedux>,
	document.getElementById("Application"),
)