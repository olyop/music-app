import { createElement, FC } from "react"

import Box from "@material-ui/core/Box"
import styled from "@material-ui/core/styles/styled"
import type { StyledProps } from "@material-ui/core/styles"

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

const Albums: FC<StyledProps> = ({ className }) => {
	const { albums } = useStateContext()
	return (
		<Box className={className}>
			{albums.map(
				album => (
					<Section
						album={album}
						key={album.albumId}
					/>
				),
			)}
		</Box>
	)
}

export default Albums