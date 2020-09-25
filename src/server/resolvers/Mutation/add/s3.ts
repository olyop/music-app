import { resize } from "./helpers"
import { s3 } from "../../../helpers"
import { IMAGE_SIZES } from "../../../globals"
import { S3FileExt, S3FileType } from "../../../types"

type UploadFunction = (id: string, file: Buffer) => Promise<unknown>

export const uploadArtistPhotos: UploadFunction =
	async (artistId, photo) => Promise.all([{
		key: s3.catalogObjectKey(
			artistId,
			S3FileType.MINI,
			S3FileExt.JPG,
		),
		data: await resize({
			image: photo,
			dim: IMAGE_SIZES.ARTIST.MINI,
		}),
	},{
		key: s3.catalogObjectKey(
			artistId,
			S3FileType.HALF,
			S3FileExt.JPG,
		),
		data: await resize({
			image: photo,
			dim: IMAGE_SIZES.ARTIST.HALF,
		}),
	},{
		key: s3.catalogObjectKey(
			artistId,
			S3FileType.FULL,
			S3FileExt.JPG,
		),
		data: await resize({
			image: photo,
			dim: IMAGE_SIZES.ARTIST.FULL,
		}),
	}].map(s3.upload))

export const uploadAlbumCovers: UploadFunction =
	async (albumId, cover) => Promise.all([{
		key: s3.catalogObjectKey(
			albumId,
			S3FileType.HALF,
			S3FileExt.JPG,
		),
		data: await resize({
			image: cover,
			dim: IMAGE_SIZES.ALBUM.HALF,
		}),
	},{
		key: s3.catalogObjectKey(
			albumId,
			S3FileType.FULL,
			S3FileExt.JPG,
		),
		data: await resize({
			image: cover,
			dim: IMAGE_SIZES.ALBUM.FULL,
		}),
	}].map(s3.upload))

export const uploadSong: UploadFunction = async (songId, audio) =>
	s3.upload({
		data: audio,
		key: s3.catalogObjectKey(
			songId,
			S3FileType.FULL,
			S3FileExt.MP3,
		),
	})