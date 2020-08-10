import orderBy from "lodash/orderBy"
import { useApolloClient } from "@apollo/client"
import { createElement, useState, useEffect, FC } from "react"

import Box from "@material-ui/core/Box"
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import CardContent from "@material-ui/core/CardContent"
import withStyles from "@material-ui/core/styles/withStyles"
import CardActionArea from "@material-ui/core/CardActionArea"

import { Genre } from "../types"
import { useStateContext } from "../context"
import { getGenresToAdd } from "../helpers"

const Header =
	withStyles(theme => ({
		root: {
			marginBottom: theme.spacing(1),
		},
	}))(Typography)

const Genre =
	withStyles(theme => ({
		root: {
			marginBottom: theme.spacing(2),
			"&:last-child": {
				marginBottom: 0,
			},
		},
	}))(Card)

const Genres: FC = () => {
	const client = useApolloClient()
	const { albums } = useStateContext()
	const [ genres, setGenres ] = useState<Genre[]>([])
	useEffect(() => {
		getGenresToAdd(client)(albums)
			.then(setGenres)
			.catch(console.error)
	}, [client, albums])
	return (
		<Box>
			<Header variant="h6">Genres</Header>
			{orderBy(genres, "name").map(
				genre => (
					<Genre key={genre.genreId}>
						<CardActionArea>
							<CardContent>
								<Typography
									component="h2"
									variant="subtitle1"
									children={genre.name}
								/>
							</CardContent>
						</CardActionArea>
					</Genre>
				),
			)}
		</Box>
	)
}

export default Genres