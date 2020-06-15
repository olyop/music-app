import {
	JSONResolver as Json,
	GUIDResolver as Uuid,
	EmailAddressResolver as Email,
	PositiveIntResolver as PositiveInt,
} from "graphql-scalars"

import Play from "./Play"
import Song from "./Song"
import User from "./User"
import * as Genre from "./Genre"
import * as Album from "./Album"
import * as Artist from "./Artist"
import Playlist from "./Playlist"

import * as Query from "./Query"
import * as Mutation from "./Mutation"

const resolvers = {
	Uuid,
	Json,
	Play,
	User,
	Song,
	Email,
	Query,
	Genre,
	Album,
	Artist,
	Mutation,
	Playlist,
	PositiveInt,
}

export default resolvers