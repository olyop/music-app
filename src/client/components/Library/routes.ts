import uniqueId from "lodash/uniqueId"

import { Route } from "../../types"
import LibrarySongs from "./LibrarySongs"
import LibraryAlbums from "./LibraryAlbums"
import LibraryGenres from "./LibraryGenres"
import LibraryArtists from "./LibraryArtists"
import LibraryPlaylists from "./LibraryPlaylists"

const routes: Route[] = [
	{
		name: "Songs",
		id: uniqueId(),
		path: "/songs",
		icon: "audiotrack",
		component: LibrarySongs,
	},
	{
		icon: "album",
		name: "Albums",
		id: uniqueId(),
		path: "/albums",
		component: LibraryAlbums,
	},
	{
		name: "Genres",
		id: uniqueId(),
		path: "/genres",
		icon: "palette",
		component: LibraryGenres,
	},
	{
		id: uniqueId(),
		icon: "person",
		name: "Artists",
		path: "/artists",
		component: LibraryArtists,
	},
	{
		id: uniqueId(),
		name: "Playlists",
		path: "/playlists",
		icon: "playlist_play",
		component: LibraryPlaylists,
	},
]

export default routes