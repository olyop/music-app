import { createElement, FC } from "react"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"

import { useStateContext } from "../context"
import { albumsToArtists } from "../helpers"

const Artists: FC = () => {
	const { albums } = useStateContext()
	return (
		<List>
			{albumsToArtists(albums).map(
				artist => (
					<ListItem
						button
						key={artist.artistId}
						children={artist.name}
					/>
				),
			)}
		</List>
	)
}
export default Artists