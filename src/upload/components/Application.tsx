import isEmpty from "lodash/isEmpty"
import { useApolloClient } from "@apollo/client"
import { FC, useState, createElement } from "react"

import Box from "@material-ui/core/Box"
import styled from "@material-ui/core/styles/styled"

import Add from "./Add"
import Main from "./Main"
import { State, Song } from "../types"
import { parseFiles } from "../helpers"
import { StateContextProvider } from "../context"

const Root =
	styled(Box)({
		width: "100vw",
		height: "100vh",
	})

const Application: FC = () => {
	const client = useApolloClient()
	const [ loading, setLoading ] = useState(false)
	const [ songs, setSongs ] = useState<Song[]>([])

	const toggleLoading = () =>
		setLoading(prevState => !prevState)

	const handleFiles = (files: FileList) => {
		setLoading(true)
		parseFiles(client, files)
			.then(setSongs)
			.catch(console.error)
			.finally(toggleLoading)
	}

	const state: State = {
		songs,
		loading,
		handleFiles,
	}

	return (
		<StateContextProvider value={state}>
			<Root>
				{isEmpty(songs) ? <Add/> : <Main/>}
			</Root>
		</StateContextProvider>
	)
}

export default Application