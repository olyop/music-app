import { InLibraryDoc } from "../../types"

export interface UserFieldModiferInput {
	docId: string,
	inLibrary: boolean,
	docKey: VarKeyEnum,
	docTypeName: DocTypeName,
}

export enum DocTypeName {
	Song = "Song",
	Artist = "Artist",
	Playlist = "Playlist",
}

export enum QueryNameEnum {
	song = "song",
	artist = "artist",
	playlist = "playlist",
}

export enum UserDocsKey {
	songs = "songs",
	artists = "artists",
	playlists = "playlists",
}

export enum VarKeyEnum {
	songId = "songId",
	artistId = "artistId",
	playlistId = "playlistId"
}

export enum MutationNameEnum {
	rmUserSong = "rmUserSong",
	addUserSong = "addUserSong",
	rmUserArtist = "rmUserArtist",
	addUserArtist = "addUserArtist",
	rmUserPlaylist = "rmUserPlaylist",
	addUserPlaylist = "addUserPlaylist",
}

export type Vars = {
	[key in VarKeyEnum]?: string
}

export type QueryData = {
	[key in QueryNameEnum]?: InLibraryDoc
}

export type MutationData = {
	[key in MutationNameEnum]?: InLibraryDoc
}