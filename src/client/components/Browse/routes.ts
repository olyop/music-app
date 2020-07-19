import uniqueId from "lodash/uniqueId"

import { Route } from "../../types"
import BrowseHome from "./BrowseHome"
import BrowseSongs from "./BrowseSongs"
import BrowseAlbums from "./BrowseAlbums"
import BrowseArtists from "./BrowseArtists"

const routes: Route[] = [{
	path: "",
	ignore: true,
	name: "Home",
	icon: "home",
	id: uniqueId(),
	component: BrowseHome,
},{
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
	name: "Songs",
	id: uniqueId(),
	path: "/songs",
	icon: "audiotrack",
	component: BrowseSongs,
}]

export default routes