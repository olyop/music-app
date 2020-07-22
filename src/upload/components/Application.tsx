import {
	FC,
	useState,
	createElement,
	ChangeEventHandler,
} from "react"

import { parseBlob } from "music-metadata-browser"

import Add from "./Add"
import { Song } from "../types"
import { parseFile, orderSongs } from "../helpers"

const Application: FC = () => {
	const [ songs, setSongs ] = useState<Song[]>([])

	const handleChange: ChangeEventHandler<HTMLInputElement> = async event => {
		const files = Array.from(event.target.files!)
		const getFiles = files.map(file => parseBlob(file))
		try {
			const res = await Promise.all(getFiles)
			setSongs(orderSongs(res.map(parseFile)))
		} catch (error) {
			console.error(error)
		}
	}

	if (songs.length !== 0) {
		console.log(songs[0])
	}

	return (
		<Add onChange={handleChange}/>
	)
}

export default Application