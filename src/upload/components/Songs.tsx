import { createElement, FC } from "react"

import Table from "@material-ui/core/Table"
import Paper from "@material-ui/core/Paper"
import TableRow from "@material-ui/core/TableRow"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableContainer from "@material-ui/core/TableContainer"

import { orderSongs } from "../helpers"
import { Song as TSong } from "../types"

const Songs: FC<PropTypes> = ({ songs }) => (
	<TableContainer component={Paper}>
		<Table size="small">
			<TableHead>
				<TableRow>
					<TableCell>#</TableCell>
					<TableCell>Title</TableCell>
					<TableCell>Artists</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{orderSongs(songs).map(
					song => (
						<TableRow hover key={song.trackNumber}>
							<TableCell padding="checkbox">{song.trackNumber}</TableCell>
							<TableCell>{song.title}</TableCell>
							<TableCell>{song.artists}</TableCell>
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