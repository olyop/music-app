import map from "lodash/fp/map"
import isEmpty from "lodash/isEmpty"
import { FC, useState, createElement } from "react"

import Box from "@material-ui/core/Box"
import styled from "@material-ui/core/styles/styled"

import Add from "./Add"
import Main from "./Main"
import { parseFiles } from "../helpers"
import { State, Album } from "../types"
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

	const handleFiles = (files: FileList) => {
		setLoading(true)
		parseFiles(files)
			.then(setAlbums)
			.catch(console.error)
			.finally(toggleLoading)
	}

	const handleAlbumTitleChange = (albumId: string, title: string) =>
		setAlbums(map(album => (
			album.albumId !== albumId ?
				album : { ...album, title }
		)))

	const handleAlbumReleasedChange = (albumId: string, released: number) =>
		setAlbums(map(album => (
			album.albumId !== albumId ?
				album : { ...album, released }
		)))

	const handleSongRemove = (albumId: string, songId: string) =>
		setAlbums(map(album => (
			album.albumId !== albumId ? album : {
				...album,
				songs: album.songs.filter(song => song.songId === songId),
			}
		)))

	const state: State = {
		albums,
		loading,
		handleFiles,
		handleSongRemove,
		handleAlbumTitleChange,
		handleAlbumReleasedChange,
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