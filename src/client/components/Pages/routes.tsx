import uniqueId from "lodash/uniqueId"

import Queues from "../Queues"
import UserPage from "../UserPage"
import Library from "../Library"
import SongsPage from "../SongPage"
import GenrePage from "../GenrePage"
import AlbumPage from "../AlbumPage"
import SearchPage from "../SearchPage"
import ArtistPage from "../ArtistPage"
import SettingsPage from "../SettingsPage"
import PlaylistPage from "../PlaylistPage"
import AddSongToPlaylist from "../AddSongToPlaylist"

import { Route } from "../../types"

const routes: Route[] = [{
	id: uniqueId(),
	path: "/library",
	component: Library,
},{
	id: uniqueId(),
	path: "/queues",
	component: Queues,
},{
	id: uniqueId(),
	component: UserPage,
	path: "/user/:userId",
},{
	id: uniqueId(),
	component: SongsPage,
	path: "/song/:songId",
},{
	id: uniqueId(),
	path: "/search",
	component: SearchPage,
},{
	id: uniqueId(),
	component: AlbumPage,
	path: "/album/:albumId",
},{
	id: uniqueId(),
	component: GenrePage,
	path: "/genre/:genreId",
},{
	id: uniqueId(),
	path: "/settings",
	component: SettingsPage,
},{
	id: uniqueId(),
	component: ArtistPage,
	path: "/artist/:artistId",
},{
	id: uniqueId(),
	component: PlaylistPage,
	path: "/playlist/:playlistId",
},{
	id: uniqueId(),
	component: AddSongToPlaylist,
	path: "/addSongToPlaylist/:songId",
}]

export default routes