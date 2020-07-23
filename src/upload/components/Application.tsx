import {
	FC,
	useState,
	createElement,
	ChangeEventHandler,
} from "react"

import isEmpty from "lodash/isEmpty"
import { styled } from "@material-ui/core/styles"
import { parseBlob } from "music-metadata-browser"

import Add from "./Add"
import Main from "./Main"
import { State, Song } from "../types"
import { StateContextProvider } from "../context"
import { parseFile, normalizeFileList } from "../helpers"

const Root = styled("div")({
	width: "100vw",
	height: "100vh",
})

const Application: FC = () => {
	const [ loading, setLoading ] = useState(false)
	const [ songs, setSongs ] = useState<Song[]>([])

	const handleFiles: ChangeEventHandler<HTMLInputElement> = async event => {
		try {
			setLoading(true)
			const files = normalizeFileList(event.target.files)
			const res = await Promise.all(files.map(file => parseBlob(file)))
			setSongs(res.map(parseFile))
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
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