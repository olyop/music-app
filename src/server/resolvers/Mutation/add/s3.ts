import { resize } from "./helpers"
import { IMAGE_SIZES } from "../../../globals"
import { S3FileExt, S3FileType } from "../../../types"
import { uploadS3Object, getS3CatalogKey } from "../../../helpers"

type UploadFunction = (id: string, file: Buffer) => Promise<unknown>

export const uploadArtistPhotos: UploadFunction =
	async (artistId, photo) => Promise.all([{
		key: getS3CatalogKey(
			artistId,
			S3FileType.MINI,
			S3FileExt.JPG,
		),
		data: await resize({
			image: photo,
			dim: IMAGE_SIZES.ARTIST.MINI,
		}),
	},{
		key: getS3CatalogKey(
			artistId,
			S3FileType.HALF,
			S3FileExt.JPG,
		),
		data: await resize({
			image: photo,
			dim: IMAGE_SIZES.ARTIST.HALF,
		}),
	},{
		key: getS3CatalogKey(
			artistId,
			S3FileType.FULL,
			S3FileExt.JPG,
		),
		data: await resize({
			image: photo,
			dim: IMAGE_SIZES.ARTIST.FULL,
		}),
	}].map(uploadS3Object))

export const uploadAlbumCovers: UploadFunction =
	async (albumId, cover) => Promise.all([{
		key: getS3CatalogKey(
			albumId,
			S3FileType.HALF,
			S3FileExt.JPG,
		),
		data: await resize({
			image: cover,
			dim: IMAGE_SIZES.ALBUM.HALF,
		}),
	},{
		key: getS3CatalogKey(
			albumId,
			S3FileType.FULL,
			S3FileExt.JPG,
		),
		data: await resize({
			image: cover,
			dim: IMAGE_SIZES.ALBUM.FULL,
		}),
	}].map(uploadS3Object))

export const uploadSong: UploadFunction = async (songId, audio) =>
	uploadS3Object({
		data: audio,
		key: getS3CatalogKey(
			songId,
			S3FileType.FULL,
			S3FileExt.MP3,
		),
	})