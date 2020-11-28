import { OrderBy } from "./misc"
import { S3FileType } from "./enums"

export interface S3FileArgs {
	size: S3FileType,
}

export interface UserArgs {
	userId: string,
}

export interface PageArgs {
	page: number,
}

export interface OrderByArgs {
	orderBy: OrderBy,
}

export interface UserQueuesArgs extends UserArgs {
	songId: string,
}

export interface DocsArgs extends OrderByArgs, PageArgs {}

export interface AddRemoveSongArgs extends UserArgs {
	songId: string,
}

export interface AddRemoveArtistArgs extends UserArgs {
	artistId: string,
}

export interface AddRemovePlaylistArgs extends UserArgs {
	playlistId: string,
}