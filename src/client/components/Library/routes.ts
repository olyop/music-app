import uniqueId from "lodash/uniqueId"

import { Route } from "../../types"
import LibrarySongs from "./LibrarySongs"
import LibraryArtists from "./LibraryArtists"

const routes: Route[] = [{
	name: "Songs",
	id: uniqueId(),
	path: "/songs",
	icon: "audiotrack",
	component: LibrarySongs,
},{
	id: uniqueId(),
	icon: "person",
	name: "Artists",
	path: "/artists",
	component: LibraryArtists,
}]

export default routes