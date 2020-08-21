import {
	Input,
	SongInput,
	SongUpload,
	AlbumInput,
	AlbumUpload,
	ArtistInput,
	ArtistUpload,
} from "./types"

import {
	uploadFileFromClient,
} from "../../../helpers"

const receiveSong = async ({ audio, ...song }: SongInput): Promise<SongUpload> => ({
	...song,
	audio: await uploadFileFromClient(audio),
})

const receiveAlbum = async ({ cover, ...album }: AlbumInput): Promise<AlbumUpload> => ({
	...album,
	cover: await uploadFileFromClient(cover),
})

const receiveArtist = async ({ photo, ...artist }: ArtistInput): Promise<ArtistUpload> => ({
	...artist,
	photo: await uploadFileFromClient(photo),
})

const receive = async (args: Input) => ({
	genres: args.genres,
	songs: await Promise.all(args.songs.map(receiveSong)),
	albums: await Promise.all(args.albums.map(receiveAlbum)),
	artists: await Promise.all(args.artists.map(receiveArtist)),
})

export default receive