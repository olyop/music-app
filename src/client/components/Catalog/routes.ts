import { uniqueId } from "lodash"

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