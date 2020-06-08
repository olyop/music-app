import Json from "graphql-type-json"
import { GraphQLScalarType } from "graphql"
import { IResolvers as Resolvers } from "apollo-server-express"

import Uuid from "./Uuid"
import Email from "./Email"

import Play from "./Play"
import Song from "./Song"
import User from "./User"
import Album from "./Album"
import Genre from "./Genre"
import Artist from "./Artist"
import Playlist from "./Playlist"

import Query from "./Query"
import Mutation from "./Mutation"

const customScalars: Record<string, GraphQLScalarType> = {
	Uuid,
	// @ts-ignore
	Json,
	Email,
}

const rootInterfaces: Resolvers = {
	Query,
	Mutation,
}

const appInterfaces: Resolvers = {
	Play,
	User,
	Song,
	Query,
	Genre,
	Album,
	Artist,
	Playlist,
}

const resolvers: Resolvers = {
	...customScalars,
	...appInterfaces,
	...rootInterfaces,
}

export default resolvers