import map from "lodash/fp/map"
import pipe from "@oly_op/pipe"
import isEmpty from "lodash/isEmpty"
import filter from "lodash/fp/filter"
import { useApolloClient } from "@apollo/client"
import { FC, useState, useEffect, createElement } from "react"

import {
	submit,
	canSubmit,
	parseFiles,
	getGenresToAdd,
	getArtistsToAdd,
} from "../helpers"

import {
	Album,
	Genre,
	Artist,
	HandleFiles,
	HandleSongRemove,
	HandleSongChange,
	HandleAlbumChange,
	HandleArtistPhotoChange,
} from "../types"

import Add from "./Add"
import Main from "./Main"
import { StateContextProvider } from "../context"

const Application: FC = () => {
	const client = useApolloClient()
	const [ loading, setLoading ] = useState(false)
	const [ albums, setAlbums ] = useState<Album[]>([])
	const [ genres, setGenres ] = useState<Genre[]>([])
	const [ artists, setArtists ] = useState<Artist[]>([])

	useEffect(() => {
		getArtistsToAdd(client)(albums)
			.then(setArtists)
			.catch(console.error)
	}, [client, albums])

	useEffect(() => {
		getGenresToAdd(client)(albums)
			.then(setGenres)
			.catch(console.error)
	}, [client, albums])

	const toggleLoading = () =>
		setLoading(prevState => !prevState)

	const handleFiles: HandleFiles = files => {
		setLoading(true)
		parseFiles(files)
			.then(setAlbums)
			.catch(console.error)
			.finally(toggleLoading)
	}

	const handleArtistPhotoChange: HandleArtistPhotoChange = artistId => photo =>
		setArtists(prevState => prevState.map(
			item => (item.artistId === artistId ? { ...item, photo } : item),
		))

	const handleAlbumChange: HandleAlbumChange = (albumId, val, key) =>
		setAlbums(map(album => (
			album.albumId === albumId ?
				{ ...album, [key]: val } : album
		)))

	const handleSongChange: HandleSongChange = (albumId, songId, val, key) =>
		setAlbums(map(album => (
			album.albumId === albumId ? {
				...album,
				songs: album.songs.map(song => (
					song.songId === songId ?
						{ ...song, [key]: val } : song
				)),
			} : album
		)))

	const handleSongRemove: HandleSongRemove = (albumId, songId) =>
		setAlbums(pipe(
			map(album => (
				album.albumId === albumId ? {
					...album,
					songs: album.songs.filter(song => song.songId !== songId),
				} : album
			)),
			filter(({ songs }) => !isEmpty(songs)),
		))

	const handleSubmit = async () => {
		if (canSubmit(artists, genres, albums)) {
			setLoading(true)
			try {
				await submit(client)(artists, genres, albums)
			} catch (error) {
				console.error(error)
			} finally {
				setAlbums([])
				setGenres([])
				setArtists([])
				toggleLoading()
			}
		}
	}

	return (
		<StateContextProvider
			value={{
				albums,
				genres,
				artists,
				loading,
				handleFiles,
				handleSubmit,
				handleSongRemove,
				handleSongChange,
				handleAlbumChange,
				handleArtistPhotoChange,
			}}
			children={isEmpty(albums) ? <Add/> : <Main/>}
		/>
	)
}

export default Application