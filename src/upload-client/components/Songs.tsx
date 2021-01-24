import orderBy from "lodash/orderBy"
import { createElement, FC, ChangeEventHandler } from "react"
import deserializeDuration from "@oly_op/music-app-common/deserializeDuration"

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
import SongArtists from "./SongArtists"
import { useStateContext } from "../context"

const TrackNumber =
	withStyles({
		root: {
			width: 15,
			textAlign: "right",
			padding: "0 !important",
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

type InputChange = (songId: string) => ChangeEventHandler<HTMLInputElement>
type SelectionChange = (songId: string) => (arr: string[]) => void

const Songs: FC<PropTypes> = ({ songs, albumId }) => {
	const { handleSongRemove, handleSongChange } =
		useStateContext()
	const handleTitleChange: InputChange = songId => event =>
		handleSongChange(albumId, songId, event.target.value, "title")
	const handleTrackNumberChange: InputChange = songId => event =>
		handleSongChange(albumId, songId, event.target.value, "trackNumber")
	const handleArtistsChange: SelectionChange = songId => arr =>
		handleSongChange(albumId, songId, arr, "artists")
	const handleFeaturingChange: SelectionChange = songId => arr =>
		handleSongChange(albumId, songId, arr, "featuring")
	const handleRemixersChange: SelectionChange = songId => arr =>
		handleSongChange(albumId, songId, arr, "remixers")
	const handleGenresChange: SelectionChange = songId => arr =>
		handleSongChange(albumId, songId, arr, "genres")
	return (
		<TableContainer component={Paper}>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell padding="checkbox"/>
						<TrackNumber>
							#
						</TrackNumber>
						<TableCell>
							Title
						</TableCell>
						<Duration>
							<Grid container alignItems="center" justify="center">
								<AccessTimeIcon fontSize="small"/>
							</Grid>
						</Duration>
						<TableCell>
							Artists
						</TableCell>
						<TableCell>
							Featuring
						</TableCell>
						<TableCell>
							Remixers
						</TableCell>
						<TableCell>
							Genres
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{orderBy(songs, "trackNumber").map(
						song => (
							<TableRow hover key={song.songId}>
								<Close>
									<Grid container alignItems="center" justify="center">
										<IconButton size="small" onClick={() => handleSongRemove(albumId, song.songId)}>
											<CloseIcon fontSize="small"/>
										</IconButton>
									</Grid>
								</Close>
								<TrackNumber>
									<TrackNumberInput
										value={song.trackNumber}
										onChange={handleTrackNumberChange(song.songId)}
									/>
								</TrackNumber>
								<TableCell>
									<Input
										value={song.title}
										onChange={handleTitleChange(song.songId)}
									/>
								</TableCell>
								<Duration>
									{deserializeDuration(song.duration)}
								</Duration>
								<TableCell>
									<SongArtists
										artists={song.artists}
										onChange={handleArtistsChange(song.songId)}
									/>
								</TableCell>
								<TableCell>
									<SongArtists
										artists={song.featuring}
										onChange={handleFeaturingChange(song.songId)}
									/>
								</TableCell>
								<TableCell>
									<SongArtists
										artists={song.remixers}
										onChange={handleRemixersChange(song.songId)}
									/>
								</TableCell>
								<TableCell>
									<SongArtists
										artists={song.genres}
										onChange={handleGenresChange(song.songId)}
									/>
								</TableCell>
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