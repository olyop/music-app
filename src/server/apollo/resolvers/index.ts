import {
	URLResolver as Url,
	GUIDResolver as Uuid,
	EmailAddressResolver as Email,
	PositiveIntResolver as PositiveInt,
	NonNegativeIntResolver as NonNegativeInt,
} from "graphql-scalars"

import { GraphQLUpload as Upload } from "graphql-upload"

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
	Url,
	Uuid,
	Play,
	User,
	Song,
	Email,
	Query,
	Genre,
	Album,
	Upload,
	Artist,
	Mutation,
	Playlist,
	PositiveInt,
	NonNegativeInt,
}

export default resolvers