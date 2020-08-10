import orderBy from "lodash/orderBy"
import { useApolloClient } from "@apollo/client"
import { createElement, useState, useEffect, FC } from "react"

import Box from "@material-ui/core/Box"
import Card from "@material-ui/core/Card"
import styled from "@material-ui/core/styles/styled"
import Typography from "@material-ui/core/Typography"
import CardContent from "@material-ui/core/CardContent"
import { StyledProps } from "@material-ui/core/styles"
import withStyles from "@material-ui/core/styles/withStyles"
import CardActionArea from "@material-ui/core/CardActionArea"

import Img from "./Img"
import { Artist } from "../types"
import { useStateContext } from "../context"
import { getArtistsToAdd } from "../helpers"

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

const Photo =
	styled(Img)(({
		height: 200,
		width: "auto",
	}))

const Artists: FC<StyledProps> = ({ className }) => {
	const client =
		useApolloClient()
	const { albums } =
		useStateContext()
	const [ artists, setArtists ] =
		useState<Artist[]>([])
	const handleCoverChange = (artistId: string) => (dataUrl: string) =>
		setArtists(prevState => prevState.map(
			item => (item.artistId === artistId ? {
				...item,
				cover: dataUrl,
			} : item),
		))
	useEffect(() => {
		getArtistsToAdd(client)(albums)
			.then(setArtists)
			.catch(console.error)
	}, [client, albums])
	return (
		<Box className={className}>
			<Header variant="h6">Artists</Header>
			{orderBy(artists, "name").map(
				artist => (
					<Artist key={artist.artistId}>
						<CardActionArea>
							<Photo
								url={artist.cover}
								title={artist.name}
								onChange={handleCoverChange(artist.artistId)}
							/>
							<CardContent>
								<Typography
									component="h2"
									variant="subtitle1"
									children={artist.name}
								/>
							</CardContent>
						</CardActionArea>
					</Artist>
				),
			)}
		</Box>
	)
}

export default Artists