import { render } from "react-dom"
import { createElement } from "react"
import { BrowserRouter as ReactRouter } from "react-router-dom"

import Main from "./components/Main"
import Header from "./components/Header"
import Footer from "./components/Footer"
import MaterialUi from "./components/MaterialUi"

render(
	<ReactRouter>
		<MaterialUi>
			<Header/>
			<Main/>
			<Footer/>
		</MaterialUi>
	</ReactRouter>,
	document.getElementById("Application"),
)