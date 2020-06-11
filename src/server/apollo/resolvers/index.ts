import Json from "graphql-type-json"
import { IResolvers } from "apollo-server-express"

import Uuid from "./Uuid"
import Email from "./Email"

import Play from "./Play"
import Song from "./Song"
import User from "./User"
import Album from "./Album"
import Genre from "./Genre"
import Artist from "./Artist"
import Playlist from "./Playlist"

import * as Query from "./Query"
import * as Mutation from "./Mutation"

const resolvers: IResolvers = {
	// scalars
	Uuid,
	Json,
	Email,

	// root
	Query,
	Mutation,

	// app
	Play,
	User,
	Song,
	Query,
	Genre,
	Album,
	Artist,
	Playlist,
}

export default resolvers