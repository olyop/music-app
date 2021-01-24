import { IResolvers } from "apollo-server-express"

import {
	URLResolver as Url,
	UUIDResolver as Uuid,
	DateResolver as Date,
	EmailAddressResolver as Email,
	TimestampResolver as Timestamp,
	PositiveIntResolver as PositiveInt,
	NonNegativeIntResolver as NonNegativeInt,
} from "graphql-scalars"

import * as Play from "./Play"
import * as User from "./User"
import * as Song from "./Song"
import * as Genre from "./Genre"
import * as Album from "./Album"
import * as Search from "./Search"
import * as Artist from "./Artist"
import * as Playlist from "./Playlist"

import * as Query from "./Query"
import * as Mutation from "./Mutation"

const resolvers: IResolvers = {
	Url,
	Date,
	Uuid,
	Play,
	User,
	Song,
	Query,
	Genre,
	Album,
	Email,
	Search,
	Artist,
	Mutation,
	Playlist,
	Timestamp,
	PositiveInt,
	NonNegativeInt,
}

export default resolvers