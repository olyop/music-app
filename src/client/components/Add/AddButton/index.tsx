import {
	FC,
	Dispatch,
	createElement,
	SetStateAction,
	ChangeEventHandler,
} from "react"

import { createBem } from "@oly_op/bem"

import { Song, Album } from "../types"
import { getMetadata, handleMetadata } from "../helpers"

import "./index.scss"

const bem = createBem("AddButton")

const AddButton: FC<PropTypes> = ({
	setAlbum, setSongs, setError, setLoading,
}) => {
	const toggleLoading = () =>
		setLoading(prevState => !prevState)

	const handleNewFiles: ChangeEventHandler<HTMLInputElement> = event => {
		toggleLoading()
		const files = Array.from(event.target.files || [])
		const fileUploads = files.map(getMetadata)
		return Promise.all(fileUploads)
			.then(setSongs)
			.catch(setError)
			.finally(toggleLoading)
	}

	return (
		<input
			multiple
			type="file"
			accept=".mp3"
			onChange={handleNewFiles}
			title="Select audio files"
			className={bem("", "Margin")}
		/>
	)
}
interface PropTypes {
	setError: Dispatch<SetStateAction<Error>>,
	setSongs: Dispatch<SetStateAction<Song[]>>,
	setAlbum: Dispatch<SetStateAction<Album[]>>,
	setLoading: Dispatch<SetStateAction<boolean>>,
}

export default AddButton