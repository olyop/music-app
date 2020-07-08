import uniqueId from "lodash/uniqueId"

// import Add from "../Add"
import Browse from "../Browse"
import { Route } from "../../types"

const routes: Route[] = [
	// {
	// 	path: "/add",
	// 	id: uniqueId(),
	// 	component: Add,
	// },
	{
		id: uniqueId(),
		path: "/browse",
		component: Browse,
	},
]

export default routes