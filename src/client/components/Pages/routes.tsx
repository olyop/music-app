import uniqueId from "lodash/uniqueId"

import Queues from "../Queues"
import Search from "../Search"
import Player from "../Player"
import Browse from "../Browse"
import Library from "../Library"
import UserPage from "../UserPage"
import PlaysPage from "../PlaysPage"
import GenrePage from "../GenrePage"
import AlbumPage from "../AlbumPage"
import ArtistPage from "../ArtistPage"

import { Route } from "../../types"

const routes: Route[] = [
	{
		id: uniqueId(),
		path: "/browse",
		component: Browse,
	},
	{
	  id: uniqueId(),
	  path: "/library",
	  component: Library,
	},
	{
		id: uniqueId(),
		name: "Player",
		path: "/player",
		component: Player,
	},
	{
		id: uniqueId(),
		name: "Search",
		path: "/search",
		component: Search,
	},
	{
	  ignore: true,
	  id: uniqueId(),
	  name: "Queues",
	  path: "/queues",
	  component: Queues,
	},
	{
		path: "/user",
		id: uniqueId(),
		component: UserPage,
	},
	{
		id: uniqueId(),
		component: PlaysPage,
		path: "/plays/:songId",
	},
	{
		ignore: true,
		id: uniqueId(),
		component: AlbumPage,
		path: "/album/:albumId",
	},
	{
		ignore: true,
		id: uniqueId(),
		component: ArtistPage,
		path: "/artist/:artistId",
	},
	{
		ignore: true,
		id: uniqueId(),
		component: GenrePage,
		path: "/genre/:genreId",
	},
]

export default routes