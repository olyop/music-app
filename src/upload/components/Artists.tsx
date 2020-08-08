import { useApolloClient } from "@apollo/client"
import { createElement, useState, useEffect, FC, Fragment } from "react"

import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import CardContent from "@material-ui/core/CardContent"
import withStyles from "@material-ui/core/styles/withStyles"
import CardActionArea from "@material-ui/core/CardActionArea"

import { Artist } from "../types"
import { useStateContext } from "../context"
import { getArtistsToAdd } from "../helpers"

const Artist =
	withStyles(theme => ({
		root: {
			marginBottom: theme.spacing(2),
			"&:last-child": {
				marginBottom: 0,
			},
		},
	}))(Card)

const Artists: FC = () => {
	const client = useApolloClient()
	const { albums } = useStateContext()
	const [ artists, setArtists ] = useState<Artist[]>([])
	useEffect(() => {
		getArtistsToAdd(client)(albums)
			.then(setArtists)
			.catch(console.error)
	}, [client, albums])
	return (
		<Fragment>
			{artists.map(
				artist => (
					<Artist key={artist.artistId}>
						<CardActionArea>
							<CardMedia
								image="null"
								title={artist.name}
							/>
							<CardContent>
								<Typography
									variant="h6"
									component="h2"
									children={artist.name}
								/>
							</CardContent>
						</CardActionArea>
					</Artist>
				),
			)}
		</Fragment>
	)
}
export default Artists