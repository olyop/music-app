import uniqueId from "lodash/uniqueId"

import Home from "../Home"
import Queues from "../Queues"
import Search from "../Search"
import Browse from "../Browse"
import Library from "../Library"
import UserPage from "../UserPage"
import SongsPage from "../SongPage"
import GenrePage from "../GenrePage"
import AlbumPage from "../AlbumPage"
import ArtistPage from "../ArtistPage"
import AddSongToPlaylist from "../AddSongToPlaylist"

import { Route } from "../../types"

const routes: Route[] = [{
	path: "/",
	exact: true,
	id: uniqueId(),
	component: Home,
},{
	id: uniqueId(),
	path: "/browse",
	component: Browse,
},{
	id: uniqueId(),
	path: "/library",
	component: Library,
},{
	id: uniqueId(),
	path: "/search",
	component: Search,
},{
	id: uniqueId(),
	path: "/queues",
	component: Queues,
},{
	path: "/user",
	id: uniqueId(),
	component: UserPage,
},{
	id: uniqueId(),
	component: SongsPage,
	path: "/song/:songId",
},{
	id: uniqueId(),
	component: AlbumPage,
	path: "/album/:albumId",
},{
	id: uniqueId(),
	component: ArtistPage,
	path: "/artist/:artistId",
},{
	id: uniqueId(),
	component: GenrePage,
	path: "/genre/:genreId",
},{
	id: uniqueId(),
	component: AddSongToPlaylist,
	path: "/addSongToPlaylist/:songId",
}]

export default routes