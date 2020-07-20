import isNull from "lodash/isNull"
import orderBy from "lodash/orderBy"
import { createBem } from "@oly_op/bem"
import { createElement, useState, FC } from "react"

import AddDocs from "./AddDocs"
import Spinner from "../Spinner"
import AddSongs from "./AddSongs"
import AddAlbum from "./AddAlbum"
import AddButton from "./AddButton"
import { Album, Song } from "./types"
import determineGenres from "./helpers/determineGenres"
import determineArtists from "./helpers/determineArtists"

import "./index.scss"

const bem = createBem("Add")

const Add: FC = () => {
	const [ error, setError ] = useState(null)
	const [ loading, setLoading ] = useState(false)
	const [ album, setAlbum ] = useState<Album | null>(null)
	const [ songs, setSongs ] = useState<Song[] | null>(null)

	if (!isNull(error)) {
		return console.error(error)
	} else if (loading) {
		return <Spinner className="Padding"/>
	} else if (isNull(songs) && isNull(album)) {
		return (
			<AddButton
				setAlbum={setAlbum}
				setSongs={setSongs}
				setError={setError}
				setLoading={setLoading}
			/>
		)
	}

	const songsOrdered =
		orderBy(songs, ["discNumber", "trackNumber"], ["asc", "asc"])

	const genres =
		determineGenres(songs)

	const artists =
		determineArtists(album, songs)

	return (
		<div className={bem("", "Padding")}>
			<AddAlbum
				album={album}
				handleChange={setAlbum}
				className={bem("album")}
			/>
			<AddSongs
				songs={songsOrdered}
				handleChange={setSongs}
			/>
			<div>
				<AddDocs
					docs={artists}
					label="Artists"
					className={bem("docs")}
				/>
				<AddDocs
					type="genre"
					docs={genres}
					label="Genres"
					className={bem("docs")}
				/>
			</div>
		</div>
	)
}

export default Add