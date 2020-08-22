import {
	Input,
	Upload,
	SongInput,
	SongUpload,
	AlbumInput,
	AlbumUpload,
	ArtistInput,
	ArtistUpload,
} from "./types"

import { uploadFileFromClient } from "./helpers"

const receiveSong = async ({ audio, ...song }: SongInput): Promise<SongUpload> => ({
	...song,
	audio: await uploadFileFromClient(audio),
})

const receiveAlbum = async ({ cover, songs, ...album }: AlbumInput): Promise<AlbumUpload> => ({
	...album,
	cover: await uploadFileFromClient(cover),
	songs: await Promise.all(songs.map(receiveSong)),
})

const receiveArtist = async ({ photo, ...artist }: ArtistInput): Promise<ArtistUpload> => ({
	...artist,
	photo: await uploadFileFromClient(photo),
})

const recieve = async (args: Input): Promise<Upload> => ({
	genres: args.genres,
	albums: await Promise.all(args.albums.map(receiveAlbum)),
	artists: await Promise.all(args.artists.map(receiveArtist)),
})

export default recieve