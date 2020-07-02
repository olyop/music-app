import { createElement, FC } from "react"

import { createBem } from "@oly_op/bem"
import getMetadata from "../helpers/getMetadata"
import handleMetadata from "../helpers/handleMetadata"

import "./index.scss"

const bem = createBem("AddButton")

const AddButton: FC<TProps> = ({
	setAlbum, setSongs, setError, setLoading,
}) => {
	const toggleLoading = () =>
		setLoading(prevState => !prevState)

	const handleNewFiles = event => {
		toggleLoading()
		getMetadata(event.target.files)
			.then(handleMetadata(setAlbum, setSongs))
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

type TProps = {
	setAlbum: func.isRequired,
	setSongs: func.isRequired,
	setError: func.isRequired,
	setLoading: func.isRequired,
}

export default AddButton