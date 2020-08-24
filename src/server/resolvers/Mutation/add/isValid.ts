import { map, isEmpty, isDate, isString, isInteger } from "lodash"

import {
	Upload,
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

const isGenre = ({
	name,
}: GenreInput) => (
	isText(name)
)

const isArtist = ({
	name,
	photo,
}: ArtistUpload) => (
	isText(name) &&
	isImg(photo)
)

const isAlbum = ({
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

const isSong = ({
	mix,
	title,
	audio,
	genres,
	artists,
	remixers,
	featuring,
	discNumber,
	trackNumber,
}: SongUpload) => (
	isText(title) &&
	isAudio(audio) &&
	isText(mix, true) &&
	isArrayOfText(genres) &&
	isArrayOfText(artists) &&
	isPositiveInt(discNumber) &&
	isArrayOfText(remixers) &&
	isPositiveInt(trackNumber) &&
	isArrayOfText(featuring)
)

const isValid = ({ albums, genres, artists }: Upload) => {
	const areAlbumsValid = albums.map(isAlbum).every(Boolean)
	const areGenresValid = genres.map(isGenre).every(Boolean)
	const areArtistsValid = artists.map(isArtist).every(Boolean)
	const areSongsValid = albums.map(({ songs }) => songs).flat().map(isSong).every(Boolean)
	return !areSongsValid || !areGenresValid || !areAlbumsValid || !areArtistsValid
}

export default isValid