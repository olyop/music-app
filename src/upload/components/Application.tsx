import {
	FC,
	useState,
	createElement,
	ChangeEventHandler,
} from "react"

import isEmpty from "lodash/isEmpty"

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
	const [ loading, setLoading ] = useState(false)
	const [ songs, setSongs ] = useState<Song[]>([])

	const toggleLoading = () => setLoading(prevState => !prevState)

	const handleFiles: ChangeEventHandler<HTMLInputElement> = event => {
		setLoading(true)
		parseFiles(event.target.files)
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