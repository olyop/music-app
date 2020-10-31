import uniqueId from "lodash/uniqueId"

import { Route } from "../../types"
import BrowseSongs from "./BrowseSongs"
import BrowseAlbums from "./BrowseAlbums"
import BrowseGenres from "./BrowseGenres"
import BrowseArtists from "./BrowseArtists"

const routes: Route[] = [{
	icon: "album",
	id: uniqueId(),
	name: "Albums",
	path: "/albums",
	component: BrowseAlbums,
},{
	id: uniqueId(),
	icon: "person",
	name: "Artists",
	path: "/artists",
	component: BrowseArtists,
},{
	icon: "list",
	id: uniqueId(),
	name: "Genres",
	path: "/genres",
	component: BrowseGenres,
},{
	name: "Songs",
	id: uniqueId(),
	path: "/songs",
	icon: "audiotrack",
	component: BrowseSongs,
}]

export default routes