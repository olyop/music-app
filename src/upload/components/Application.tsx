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

	const handleChange: ChangeEventHandler<HTMLInputElement> = event =>
		Promise
			.resolve(event.target.files!)
			.then(files => Array.from(files))
			.then(files => files.map(file => parseBlob(file)))
			.then(files => Promise.all(files))
			.then(files => files.map(parseFile))
			.then(orderSongs)
			.then(setSongs)
			.catch(console.error)

	if (songs.length !== 0) {
		console.log(songs[0])
	}

	return (
		<Add onChange={handleChange}/>
	)
}

export default Application