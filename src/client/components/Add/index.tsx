import { isNull, orderBy } from "lodash"
import { createElement, useState, FC } from "react"

import AddDocs from "./AddDocs"
import Spinner from "../Spinner"
import AddSongs from "./AddSongs"
import AddAlbum from "./AddAlbum"
import ApiError from "../ApiError"
import AddButton from "./AddButton"
import { reactBem } from "../../helpers"
import determineGenres from "./helpers/determineGenres"
import determineArtists from "./helpers/determineArtists"

import "./index.scss"

const bem = reactBem("Add")

const Add: FC = () => {
	const [ album, setAlbum ] = useState(null)
	const [ songs, setSongs ] = useState(null)
	const [ error, setError ] = useState(null)
	const [ loading, setLoading ] = useState(false)

	if (!isNull(error)) {
		return <ApiError error={error}/>
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
