import { createElement, FC } from "react"
import { deserializeDuration } from "@oly_op/music-app-common"

import Grid from "@material-ui/core/Grid"
import Table from "@material-ui/core/Table"
import Paper from "@material-ui/core/Paper"
import CloseIcon from "@material-ui/icons/Close"
import TableRow from "@material-ui/core/TableRow"
import InputBase from "@material-ui/core/InputBase"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import IconButton from "@material-ui/core/IconButton"
import AccessTimeIcon from "@material-ui/icons/AccessTime"
import withStyles from "@material-ui/core/styles/withStyles"
import TableContainer from "@material-ui/core/TableContainer"

import { Song } from "../types"
import { useStateContext } from "../context"

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
		root: { width: "100%" },
		input: { fontSize: 14 },
	})(InputBase)

const TrackNumberInput =
	withStyles({
		input: {
			textAlign: "right",
		},
	})(Input)

const Close =
	withStyles({
		root: {
			paddingTop: "0 !important",
			paddingBottom: "0 !important",
			paddingLeft: "4px !important",
			paddingRight: "4px !important",
		},
	})(TableCell)

const Songs: FC<PropTypes> = ({ songs, albumId }) => {
	const { handleSongRemove } = useStateContext()
	return (
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
						<TableCell padding="checkbox"/>
					</TableRow>
				</TableHead>
				<TableBody>
					{songs.map(
						song => (
							<TableRow hover key={song.songId}>
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
								<Close>
									<Grid container alignItems="center" justify="center">
										<IconButton size="small" onClick={() => handleSongRemove(albumId, song.songId)}>
											<CloseIcon fontSize="small"/>
										</IconButton>
									</Grid>
								</Close>
							</TableRow>
						),
					)}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

interface PropTypes {
	songs: Song[],
	albumId: string,
}

export default Songs