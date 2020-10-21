import uniqueId from "lodash/uniqueId"

import { Route } from "../../types"
import LibrarySongs from "./LibrarySongs"
import LibraryAlbums from "./LibraryAlbums"
import LibraryArtists from "./LibraryArtists"

const routes: Route[] = [{
	name: "Songs",
	id: uniqueId(),
	path: "/songs",
	icon: "audiotrack",
	component: LibrarySongs,
},{
	icon: "album",
	name: "Albums",
	id: uniqueId(),
	path: "/albums",
	component: LibraryAlbums,
},{
	id: uniqueId(),
	icon: "person",
	name: "Artists",
	path: "/artists",
	component: LibraryArtists,
}]

export default routes