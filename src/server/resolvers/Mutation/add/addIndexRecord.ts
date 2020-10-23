import { ag } from "../../../services"

const songsIndex = ag.initIndex("songs")
const genresIndex = ag.initIndex("genres")
const albumsIndex = ag.initIndex("albums")
const artistsIndex = ag.initIndex("artists")

export const addSongIndexRecord = (id: string, val: string) =>
	songsIndex.saveObject({ title: val, objectID: id })

export const addGenreIndexRecord = (id: string, val: string) =>
	genresIndex.saveObject({ name: val, objectID: id })

export const addAlbumIndexRecord = (id: string, val: string) =>
	albumsIndex.saveObject({ title: val, objectID: id })

export const addArtistIndexRecord = (id: string, val: string) =>
	artistsIndex.saveObject({ name: val, objectID: id })