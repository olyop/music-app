import { map, isEmpty, isString, isInteger } from "lodash"

import {
	SongUpload,
	GenreInput,
	AlbumUpload,
	ArtistUpload,
} from "./types"

const isText = (text: string, canBeEmpty = false) => (
	isString(text) &&
	(canBeEmpty ? true : !isEmpty(text)) &&
	text.length <= 2048
)

const isDate = (text: string) =>
	!isNaN(Date.parse(text))

const isArrayOfText = (arr: string[]) =>
	map(arr, isText).every(Boolean)

const isPositiveInt = (integer: number) => (
	isInteger(integer) &&
	integer >= 0
)

const isFile = (file: Buffer) => (
	Buffer.isBuffer(file) &&
	!isEmpty(file.toString())
)

const isAudio = (audio: Buffer) => (
	isFile(audio) && audio.length <= 5e7
)

const isImg = (img: Buffer) => (
	isFile(img) && img.length <= 1e7
)

export const isGenre = ({
	name,
}: GenreInput) => (
	isText(name)
)

export const isArtist = ({
	name,
	photo,
}: ArtistUpload) => (
	isText(name) &&
	isImg(photo)
)

export const isAlbum = ({
	title,
	cover,
	artists,
	released,
}: AlbumUpload) => (
	isImg(cover) &&
	isText(title) &&
	isDate(released) &&
	isArrayOfText(artists)
)

export const isSong = ({
	mix,
	title,
	audio,
	album,
	genres,
	artists,
	remixers,
	featuring,
	discNumber,
	trackNumber,
}: SongUpload) => (
	isText(title) &&
	isAudio(audio) &&
	isText(album) &&
	isText(mix, true) &&
	isArrayOfText(genres) &&
	isArrayOfText(artists) &&
	isPositiveInt(discNumber) &&
	isArrayOfText(remixers) &&
	isPositiveInt(trackNumber) &&
	isArrayOfText(featuring)
)