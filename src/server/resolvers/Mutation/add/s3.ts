import { resize } from "./helpers"
import { s3 } from "../../../helpers"
import { IMAGE_SIZES } from "../../../globals"
import { ImgFormat, ImgSizeEnum } from "../../../types"

type UploadFunction = (id: string, file: Buffer) => Promise<unknown>

export const uploadArtistPhotos: UploadFunction = async (artistId, photo) =>
	Promise.all([
		{
			key: s3.catalogObjectKey({
				id: artistId,
				format: ImgFormat.JPG,
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
				format: ImgFormat.JPG,
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
				format: ImgFormat.JPG,
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
				format: ImgFormat.JPG,
				size: ImgSizeEnum.HALF,
			}),
			data: await resize({
				image: cover,
				dim: IMAGE_SIZES.ALBUM.HALF,
			}),
		},{
			key: s3.catalogObjectKey({
				id: albumId,
				format: ImgFormat.JPG,
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
			format: ImgFormat.MP3,
			size: ImgSizeEnum.FULL,
		}),
	})