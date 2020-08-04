import { createElement, FC, Fragment } from "react"

import styled from "@material-ui/core/styles/styled"

import Album from "./Album"
import { useStateContext } from "../context"

const Section =
	styled(Album)(({ theme }) => ({
		...theme.borderBottom,
		marginBottom: theme.spacing(4),
		paddingBottom: theme.spacing(4),
		"&:last-child": {
			border: 0,
			marginBottom: 0,
			paddingBottom: 0,
		},
	}))

const Albums: FC = () => {
	const { albums } = useStateContext()
	return (
		<Fragment>
			{albums.map(
				album => (
					<Section
						album={album}
						key={album.albumId}
					/>
				),
			)}
		</Fragment>
	)
}

export default Albums