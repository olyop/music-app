import { createElement, FC } from "react"
import { deserializeDuration } from "@oly_op/music-app-common"

import Grid from "@material-ui/core/Grid"
import Table from "@material-ui/core/Table"
import Paper from "@material-ui/core/Paper"
import TableRow from "@material-ui/core/TableRow"
import InputBase from "@material-ui/core/InputBase"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import AccessTimeIcon from "@material-ui/icons/AccessTime"
import withStyles from "@material-ui/core/styles/withStyles"
import TableContainer from "@material-ui/core/TableContainer"

import { orderSongs } from "../helpers"
import { Song as TSong } from "../types"

const TrackNumber =
	withStyles({
		root: {
			width: 32,
			paddingRight: 0,
			textAlign: "right",
		},
	})(TableCell)

const Duration =
	withStyles(theme => ({
		root: {
			width: 35,
			paddingLeft: 0,
			paddingRight: 0,
			textAlign: "center",
			color: theme.palette.grey[600],
		},
	}))(TableCell)

const Input =
	withStyles({
		input: {
			fontSize: 14,
		},
	})(InputBase)

const TrackNumberInput =
	withStyles({
		input: {
			textAlign: "right",
		},
	})(Input)

const Songs: FC<PropTypes> = ({ songs }) => (
	<TableContainer component={Paper}>
		<Table size="small">
			<TableHead>
				<TableRow>
					<TrackNumber>#</TrackNumber>
					<TableCell>Title</TableCell>
					<Duration>
						<Grid container alignItems="center" justify="center">
							<AccessTimeIcon fontSize="small"/>
						</Grid>
					</Duration>
					<TableCell>
						Artists
					</TableCell>
					<TableCell>
						Genres
					</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{orderSongs(songs).map(
					song => (
						<TableRow hover key={song.trackNumber}>
							<TrackNumber>
								<TrackNumberInput defaultValue={song.trackNumber}/>
							</TrackNumber>
							<TableCell>
								<Input defaultValue={song.title}/>
							</TableCell>
							<Duration>
								{deserializeDuration(song.duration)}
							</Duration>
							<TableCell>
								{song.artists.join(", ")}
							</TableCell>
							<TableCell>
								{song.genres.join(", ")}
							</TableCell>
						</TableRow>
					),
				)}
			</TableBody>
		</Table>
	</TableContainer>
)

interface PropTypes {
	songs: TSong[],
}

export default Songs