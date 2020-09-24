import { resize } from "./helpers"
import { s3 } from "../../../helpers"
import { ImgSizeEnum } from "../../../types"
import { IMAGE_SIZES } from "../../../globals"

type UploadFunction = (id: string, file: Buffer) => Promise<unknown>

export const uploadArtistPhotos: UploadFunction = async (artistId, photo) =>
	Promise.all([
		{
			key: s3.catalogObjectKey({
				id: artistId,
				format: "jpg",
				size: ImgSizeEnum.MINI,
			}),
			data: await resize({
				image: photo,
				dim: IMAGE_SIZES.ARTIST.MINI,
			}),
		},
		{
			key: s3.catalogObjectKey({
				id: artistId,
				format: "jpg",
				size: ImgSizeEnum.HALF,
			}),
			data: await resize({
				image: photo,
				dim: IMAGE_SIZES.ARTIST.HALF,
			}),
		},
		{
			key: s3.catalogObjectKey({
				id: artistId,
				format: "jpg",
				size: ImgSizeEnum.FULL,
			}),
			data: await resize({
				image: photo,
				dim: IMAGE_SIZES.ARTIST.FULL,
			}),
		},
	].map(s3.upload))

export const uploadAlbumCovers: UploadFunction = async (albumId, cover) =>
	Promise.all([
		{
			key: s3.catalogObjectKey({
				id: albumId,
				format: "jpg",
				size: ImgSizeEnum.HALF,
			}),
			data: await resize({
				image: cover,
				dim: IMAGE_SIZES.ALBUM.HALF,
			}),
		},{
			key: s3.catalogObjectKey({
				id: albumId,
				format: "jpg",
				size: ImgSizeEnum.FULL,
			}),
			data: await resize({
				image: cover,
				dim: IMAGE_SIZES.ALBUM.FULL,
			}),
		},
	].map(s3.upload))

export const uploadSong: UploadFunction = async (songId, audio) =>
	s3.upload({
		data: audio,
		key: s3.catalogObjectKey({
			id: songId,
			format: "mp3",
			size: ImgSizeEnum.FULL,
		}),
	})