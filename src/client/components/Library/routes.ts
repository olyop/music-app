import uniqueId from "lodash/uniqueId"

import { Route } from "../../types"
import LibrarySongs from "./LibrarySongs"
import LibraryGenres from "./LibraryGenres"
import LibraryAlbums from "./LibraryAlbums"
import LibraryArtists from "./LibraryArtists"
import LibraryPlaylists from "./LibraryPlaylists"

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
},{
	id: uniqueId(),
	name: "Playlists",
	path: "/playlists",
	icon: "queue_music",
	component: LibraryPlaylists,
},{
	icon: "list",
	name: "Genres",
	id: uniqueId(),
	path: "/genres",
	component: LibraryGenres,
},{
	icon: "album",
	name: "Albums",
	id: uniqueId(),
	path: "/albums",
	component: LibraryAlbums,
}]

export default routes