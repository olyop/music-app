import { render } from "react-dom"
import { createElement } from "react"

import MaterialUi from "./components/MaterialUi"
import Application from "./components/Application"

render(
	<MaterialUi>
		<Application/>
	</MaterialUi>,
	document.getElementById("Application"),
)