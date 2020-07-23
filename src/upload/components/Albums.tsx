import { createElement, Fragment } from "react"

import Album from "./Album"
import { songsToAlbums } from "../helpers"
import { useStateContext } from "../context"

const Albums = () => {
	const { songs } = useStateContext()
	const albums = songsToAlbums(songs)
	return (
		<Fragment>
			{albums.map(
				album => (
					<Album songs={album}/>
				),
			)}
		</Fragment>
	)
}

export default Albums