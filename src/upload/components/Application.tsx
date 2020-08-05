import map from "lodash/fp/map"
import pipe from "@oly_op/pipe"
import filter from "lodash/fp/filter"
import isEmpty from "lodash/isEmpty"
import { FC, useState, createElement } from "react"

import Box from "@material-ui/core/Box"
import styled from "@material-ui/core/styles/styled"

import {
	State,
	Album,
	HandleFiles,
	HandleSongRemove,
	HandleSongChange,
	HandleAlbumChange,
} from "../types"

import Add from "./Add"
import Main from "./Main"
import { parseFiles } from "../helpers"
import { StateContextProvider } from "../context"

const Root =
	styled(Box)({
		width: "100vw",
		height: "100vh",
	})

const Application: FC = () => {
	const [ loading, setLoading ] = useState(false)
	const [ albums, setAlbums ] = useState<Album[]>([])

	const toggleLoading = () =>
		setLoading(prevState => !prevState)

	const handleFiles: HandleFiles = files => {
		setLoading(true)
		parseFiles(files)
			.then(setAlbums)
			.catch(console.error)
			.finally(toggleLoading)
	}

	const handleAlbumChange: HandleAlbumChange = (albumId, val, key) =>
		setAlbums(map(album => (
			album.albumId === albumId ?
				{ ...album, [key]: val } : album
		)))

	const handleSongChange: HandleSongChange = (albumId, songId, val, key) =>
		setAlbums(map(album => (
			album.albumId === albumId ?
				{
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

	const state: State = {
		albums,
		loading,
		handleFiles,
		handleSongRemove,
		handleSongChange,
		handleAlbumChange,
	}

	return (
		<StateContextProvider value={state}>
			<Root>
				{isEmpty(albums) ? <Add/> : <Main/>}
			</Root>
		</StateContextProvider>
	)
}

export default Application