import {
	JSONResolver as Json,
	GUIDResolver as Uuid,
	EmailAddressResolver as Email,
	PositiveIntResolver as PositiveInt,
	NonNegativeIntResolver as NonNegativeInt,
} from "graphql-scalars"

import * as Play from "./Play"
import * as User from "./User"
import * as Song from "./Song"
import * as Genre from "./Genre"
import * as Album from "./Album"
import * as Artist from "./Artist"
import * as Playlist from "./Playlist"

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
	NonNegativeInt,
}

export default resolvers