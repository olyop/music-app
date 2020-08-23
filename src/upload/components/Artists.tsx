import orderBy from "lodash/orderBy"
import { createElement, FC } from "react"

import Box from "@material-ui/core/Box"
import Card from "@material-ui/core/Card"
import styled from "@material-ui/core/styles/styled"
import Typography from "@material-ui/core/Typography"
import { StyledProps } from "@material-ui/core/styles"
import CardContent from "@material-ui/core/CardContent"
import withStyles from "@material-ui/core/styles/withStyles"
import CardActionArea from "@material-ui/core/CardActionArea"

import Img from "./Img"
import { Artist } from "../types"
import { useStateContext } from "../context"

const Header =
	withStyles(theme => ({
		root: {
			marginTop: -6,
			marginBottom: theme.spacing(1),
		},
	}))(Typography)

const Artist =
	withStyles(theme => ({
		root: {
			marginBottom: theme.spacing(1.5),
			"&:last-child": {
				marginBottom: 0,
			},
		},
	}))(Card)

const ArtistContent =
	withStyles({
		root: {
			padding: 0,
			paddingBottom: "0 !important",
		},
	})(CardContent)

const ArtistName =
	withStyles(theme => ({
		root: {
			padding: theme.spacing(1.5),
			...theme.typography.subtitle2,
		},
	}))(Typography)

const Photo =
	styled(Img)(({
		height: 200,
		width: "auto",
	}))

const Artists: FC<StyledProps> = ({ className }) => {
	const { artists, handleArtistPhotoChange } =
		useStateContext()
	return (
		<Box className={className}>
			<Header variant="h6">Artists</Header>
			{orderBy(artists, "name").map(
				artist => (
					<Artist key={artist.name}>
						<ArtistContent>
							<CardActionArea>
								<Photo
									img={artist.photo}
									title={artist.name}
									onChange={handleArtistPhotoChange(artist.artistId)}
								/>
							</CardActionArea>
							<ArtistName>
								{artist.name}
							</ArtistName>
						</ArtistContent>
					</Artist>
				),
			)}
		</Box>
	)
}

export default Artists